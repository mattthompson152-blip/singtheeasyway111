import { useState } from "react";
import { trpc } from "@/providers/trpc";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  ExternalLink,
  Settings,
  BookOpen,
  Briefcase,
  Globe,
  Mail,
} from "lucide-react";

type AdminTab = "bookings" | "services" | "availability" | "settings";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>("bookings");

  // Data queries
  const { data: bookings, refetch: refetchBookings } =
    trpc.booking.list.useQuery();
  const { data: services, refetch: refetchServices } =
    trpc.service.listAll.useQuery();
  const { data: availabilitySlots, refetch: refetchAvailability } =
    trpc.availability.list.useQuery();
  const { data: settingsList, refetch: refetchSettings } =
    trpc.settings.list.useQuery();

  // Mutations
  const utils = trpc.useUtils();

  const createService = trpc.service.create.useMutation({
    onSuccess: () => {
      refetchServices();
      utils.service.list.invalidate();
      toast.success("Service created");
    },
  });

  const updateService = trpc.service.update.useMutation({
    onSuccess: () => {
      refetchServices();
      utils.service.list.invalidate();
      toast.success("Service updated");
    },
  });

  const deleteService = trpc.service.delete.useMutation({
    onSuccess: () => {
      refetchServices();
      utils.service.list.invalidate();
      toast.success("Service deleted");
    },
  });

  const createAvailability = trpc.availability.create.useMutation({
    onSuccess: () => {
      refetchAvailability();
      toast.success("Availability slot added");
    },
  });

  const deleteAvailability = trpc.availability.delete.useMutation({
    onSuccess: () => {
      refetchAvailability();
      toast.success("Availability slot removed");
    },
  });

  const updateBookingStatus = trpc.booking.updateStatus.useMutation({
    onSuccess: () => {
      refetchBookings();
      toast.success("Booking status updated");
    },
  });

  const bulkSetSettings = trpc.settings.bulkSet.useMutation({
    onSuccess: () => {
      refetchSettings();
      toast.success("Settings saved");
    },
  });

  // Service form state
  const [serviceForm, setServiceForm] = useState({
    name: "",
    description: "",
    duration: 30,
    price: 0,
    color: "#3b82f6",
  });
  const [editingService, setEditingService] = useState<number | null>(null);

  // Availability form state
  const [availForm, setAvailForm] = useState({
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "17:00",
  });

  // Settings state
  const [settingsForm, setSettingsForm] = useState({
    businessName: "Seeing The Easy Way",
    businessEmail: "",
    businessTimezone: "Europe/London",
    smtpHost: "",
    smtpPort: "587",
    smtpUser: "",
    smtpPass: "",
  });

  const handleSaveSettings = () => {
    bulkSetSettings.mutate({
      businessName: settingsForm.businessName,
      businessEmail: settingsForm.businessEmail,
      businessTimezone: settingsForm.businessTimezone,
      smtpHost: settingsForm.smtpHost,
      smtpPort: settingsForm.smtpPort,
      smtpUser: settingsForm.smtpUser,
      smtpPass: settingsForm.smtpPass,
    });
  };

  const handleGoogleAuth = () => {
    const { data } = trpc.google.authUrl.useQuery();
    if (data?.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-xs text-slate-500">Manage your booking system</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              <ExternalLink className="w-4 h-4 mr-1" />
              View Booking Page
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AdminTab)}>
          <TabsList className="mb-6">
            <TabsTrigger value="bookings" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="services" className="gap-2">
              <Briefcase className="w-4 h-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="availability" className="gap-2">
              <Clock className="w-4 h-4" />
              Availability
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">All Bookings</h2>
              <Badge variant="secondary">{bookings?.length ?? 0} total</Badge>
            </div>

            <div className="grid gap-3">
              {bookings?.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{booking.clientName}</span>
                          <Badge
                            className={
                              STATUS_COLORS[booking.status as keyof typeof STATUS_COLORS]
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-500">
                          <Mail className="w-3 h-3 inline mr-1" />
                          {booking.clientEmail}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {formatInTimeZone(
                              booking.bookingDateTimeUTC,
                              "Europe/London",
                              "MMM d, yyyy h:mm a",
                            )}{" "}
                            (UK)
                          </span>
                          <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3 text-slate-400" />
                            Client: {booking.clientTimezone}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">
                          Service: {booking.service?.name}
                        </p>
                        {booking.notes && (
                          <p className="text-sm text-slate-500">
                            Notes: {booking.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Select
                          value={booking.status}
                          onValueChange={(status) =>
                            updateBookingStatus.mutate({
                              id: booking.id,
                              status: status as any,
                            })
                          }
                        >
                          <SelectTrigger className="w-[130px] h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {bookings?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500">No bookings yet.</p>
              </div>
            )}
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Services</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Service</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={serviceForm.name}
                        onChange={(e) =>
                          setServiceForm({ ...serviceForm, name: e.target.value })
                        }
                        placeholder="e.g. Initial Consultation"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={serviceForm.description}
                        onChange={(e) =>
                          setServiceForm({
                            ...serviceForm,
                            description: e.target.value,
                          })
                        }
                        placeholder="Describe the service..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Duration (minutes)</Label>
                        <Input
                          type="number"
                          value={serviceForm.duration}
                          onChange={(e) =>
                            setServiceForm({
                              ...serviceForm,
                              duration: parseInt(e.target.value) || 30,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Price (pence)</Label>
                        <Input
                          type="number"
                          value={serviceForm.price}
                          onChange={(e) =>
                            setServiceForm({
                              ...serviceForm,
                              price: parseInt(e.target.value) || 0,
                            })
                          }
                          placeholder="0 = free"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Color</Label>
                      <Input
                        type="color"
                        value={serviceForm.color}
                        onChange={(e) =>
                          setServiceForm({ ...serviceForm, color: e.target.value })
                        }
                        className="h-10"
                      />
                    </div>
                    <Button
                      className="w-full"
                      disabled={!serviceForm.name || createService.isPending}
                      onClick={() => {
                        createService.mutate(serviceForm);
                        setServiceForm({
                          name: "",
                          description: "",
                          duration: 30,
                          price: 0,
                          color: "#3b82f6",
                        });
                      }}
                    >
                      Create Service
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-3">
              {services?.map((service) => (
                <Card key={service.id}>
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                          style={{ backgroundColor: service.color + "20" }}
                        >
                          <Briefcase
                            className="w-5 h-5"
                            style={{ color: service.color }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{service.name}</span>
                            <Badge variant={service.active ? "default" : "secondary"}>
                              {service.active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-500">
                            {service.description || "No description"}
                          </p>
                          <div className="flex items-center gap-3 text-sm mt-1">
                            <span className="flex items-center gap-1 text-slate-600">
                              <Clock className="w-3 h-3" />
                              {service.duration} min
                            </span>
                            {service.price > 0 && (
                              <span className="text-slate-600">
                                £{(service.price / 100).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            updateService.mutate({
                              id: service.id,
                              active: !service.active,
                            });
                          }}
                        >
                          {service.active ? (
                            <X className="w-4 h-4" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (confirm("Delete this service?")) {
                              deleteService.mutate({ id: service.id });
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Availability Tab */}
          <TabsContent value="availability" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Weekly Availability</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Slot
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Availability Slot</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Day of Week</Label>
                      <Select
                        value={String(availForm.dayOfWeek)}
                        onValueChange={(v) =>
                          setAvailForm({ ...availForm, dayOfWeek: parseInt(v) })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {DAYS.map((day, i) => (
                            <SelectItem key={i} value={String(i)}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Time</Label>
                        <Input
                          type="time"
                          value={availForm.startTime}
                          onChange={(e) =>
                            setAvailForm({
                              ...availForm,
                              startTime: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Time</Label>
                        <Input
                          type="time"
                          value={availForm.endTime}
                          onChange={(e) =>
                            setAvailForm({
                              ...availForm,
                              endTime: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => {
                        createAvailability.mutate(availForm);
                      }}
                    >
                      Add Slot
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {DAYS.map((day, dayIndex) => {
              const daySlots =
                availabilitySlots?.filter((s) => s.dayOfWeek === dayIndex) ?? [];
              return (
                <Card key={dayIndex}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{day}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {daySlots.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {daySlots.map((slot) => (
                          <Badge
                            key={slot.id}
                            variant="secondary"
                            className="flex items-center gap-1 px-3 py-1"
                          >
                            <Clock className="w-3 h-3" />
                            {slot.startTime} - {slot.endTime}
                            <button
                              className="ml-1 hover:text-red-500"
                              onClick={() => {
                                if (confirm("Remove this slot?")) {
                                  deleteAvailability.mutate({ id: slot.id });
                                }
                              }}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400">No availability set</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Business Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input
                    value={settingsForm.businessName}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        businessName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Business Email</Label>
                  <Input
                    type="email"
                    value={settingsForm.businessEmail}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        businessEmail: e.target.value,
                      })
                    }
                    placeholder="your-email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Business Timezone</Label>
                  <Select
                    value={settingsForm.businessTimezone}
                    onValueChange={(v) =>
                      setSettingsForm({ ...settingsForm, businessTimezone: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/London">
                        London (GMT/BST)
                      </SelectItem>
                      <SelectItem value="Europe/Paris">
                        Paris (CET)
                      </SelectItem>
                      <SelectItem value="America/New_York">
                        New York (ET)
                      </SelectItem>
                      <SelectItem value="America/Los_Angeles">
                        Los Angeles (PT)
                      </SelectItem>
                      <SelectItem value="Australia/Sydney">
                        Sydney (AEST)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email (SMTP) Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>SMTP Host</Label>
                    <Input
                      value={settingsForm.smtpHost}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          smtpHost: e.target.value,
                        })
                      }
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>SMTP Port</Label>
                    <Input
                      value={settingsForm.smtpPort}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          smtpPort: e.target.value,
                        })
                      }
                      placeholder="587"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>SMTP Username</Label>
                  <Input
                    value={settingsForm.smtpUser}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        smtpUser: e.target.value,
                      })
                    }
                    placeholder="your-email@gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>SMTP Password / App Password</Label>
                  <Input
                    type="password"
                    value={settingsForm.smtpPass}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        smtpPass: e.target.value,
                      })
                    }
                    placeholder="your-app-password"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Google Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-500">
                  Connect your Google Calendar to automatically sync bookings and
                  send calendar invites to clients.
                </p>
                <Button onClick={handleGoogleAuth} variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Connect Google Calendar
                </Button>
              </CardContent>
            </Card>

            <Button
              className="w-full"
              onClick={handleSaveSettings}
              disabled={bulkSetSettings.isPending}
            >
              {bulkSetSettings.isPending ? "Saving..." : "Save All Settings"}
            </Button>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
