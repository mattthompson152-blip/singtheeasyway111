import { useState } from "react";
import { trpc } from "@/providers/trpc";
import { useTimezone } from "@/hooks/useTimezone";
import { format, addDays, startOfDay } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { Calendar } from "@/components/ui/calendar";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Globe, Clock, CalendarDays, User, Mail, Phone, Check, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

type Step = "service" | "datetime" | "details" | "confirm";

export default function BookingPage() {
  const [step, setStep] = useState<Step>("service");
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<Date>();
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [notes, setNotes] = useState("");

  const {
    clientTimezone,
    setClientTimezone,
    formatInClientZone,
    commonTimezones,
    generateTimeSlots,
  } = useTimezone();

  const { data: services } = trpc.service.list.useQuery();
  const { data: availability } = trpc.availability.list.useQuery();
  const { data: existingBookings } = trpc.booking.list.useQuery(undefined, {
    enabled: step === "datetime",
  });

  const createBooking = trpc.booking.create.useMutation({
    onSuccess: () => {
      setStep("confirm");
    },
  });

  const selectedService = services?.find((s) => s.id === selectedServiceId);

  const timeSlots =
    selectedDate && selectedService && availability
      ? generateTimeSlots(
          selectedDate,
          availability,
          existingBookings?.map((b) => ({
            bookingDateTimeUTC: b.bookingDateTimeUTC,
          })) ?? [],
          selectedService.duration,
        )
      : [];

  const handleSubmit = () => {
    if (!selectedService || !selectedTime || !clientName || !clientEmail) return;

    // Get Google tokens from localStorage if available
    const googleTokensStr = localStorage.getItem("google_tokens");
    const googleTokens = googleTokensStr ? JSON.parse(googleTokensStr) : undefined;

    createBooking.mutate({
      serviceId: selectedService.id,
      clientName,
      clientEmail,
      clientPhone: clientPhone || undefined,
      clientTimezone,
      bookingDateTimeUTC: selectedTime.toISOString(),
      notes: notes || undefined,
      googleTokens,
    });
  };

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 90);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Seeing The Easy Way</h1>
              <p className="text-xs text-slate-500">Book your session</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-400" />
            <Select value={clientTimezone} onValueChange={setClientTimezone}>
              <SelectTrigger className="w-[200px] text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {commonTimezones.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            {(["service", "datetime", "details"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step === s
                      ? "bg-blue-600 text-white"
                      : step === "confirm" ||
                        (["datetime", "details"].includes(step) &&
                          (["service", "datetime"].includes(s)))
                      ? "bg-green-500 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step === "confirm" ||
                  (step === "details" && s !== "details") ||
                  (step === "datetime" && s === "service") ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-sm capitalize ${
                    step === s ? "text-blue-600 font-medium" : "text-slate-500"
                  }`}
                >
                  {s === "datetime" ? "Date & Time" : s}
                </span>
                {i < 2 && <Separator className="w-8 mx-1" />}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Select Service */}
        {step === "service" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Choose a Service</h2>
              <p className="text-slate-500 mt-1">Select the type of session you need</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services?.map((service) => (
                <Card
                  key={service.id}
                  className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
                    selectedServiceId === service.id
                      ? "border-blue-500 shadow-lg"
                      : "border-transparent hover:border-slate-300"
                  }`}
                  onClick={() => setSelectedServiceId(service.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: service.color + "20" }}
                      >
                        <CalendarDays
                          className="w-5 h-5"
                          style={{ color: service.color }}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <p className="text-sm text-slate-500">
                          {service.duration} minutes
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-3">
                      {service.description || "No description available"}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        <Clock className="w-3 h-3 mr-1" />
                        {service.duration} min
                      </Badge>
                      {service.price > 0 && (
                        <span className="text-sm font-semibold text-slate-700">
                          £{(service.price / 100).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {services?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500">No services available at the moment.</p>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <Button
                size="lg"
                disabled={!selectedServiceId}
                onClick={() => setStep("datetime")}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === "datetime" && selectedService && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Pick a Date & Time</h2>
              <p className="text-slate-500 mt-1">
                Times shown in{" "}
                <span className="font-medium text-blue-600">{clientTimezone}</span>
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CalendarDays className="w-5 h-5" />
                    Select Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < today || date > maxDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Available Times
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDate ? (
                    timeSlots.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2 max-h-[320px] overflow-y-auto">
                        {timeSlots.map((slot, i) => (
                          <Button
                            key={i}
                            variant={
                              selectedTime?.getTime() === slot.getTime()
                                ? "default"
                                : "outline"
                            }
                            className="justify-center"
                            onClick={() => setSelectedTime(slot)}
                          >
                            {formatInClientZone(slot, "h:mm a")}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-slate-500">
                          No available slots for this date.
                        </p>
                        <p className="text-sm text-slate-400 mt-1">
                          Try selecting a different date.
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-slate-500">
                        Please select a date first.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {selectedDate && selectedTime && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Your selection</p>
                      <p className="font-medium text-slate-900">
                        {format(selectedDate, "EEEE, MMMM d, yyyy")} at{" "}
                        {formatInClientZone(selectedTime, "h:mm a")}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Your timezone: {clientTimezone}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">UK time</p>
                      <p className="font-medium text-slate-900">
                        {formatInTimeZone(selectedTime, "Europe/London", "h:mm a")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep("service")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                size="lg"
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep("details")}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Client Details */}
        {step === "details" && selectedService && selectedDate && selectedTime && (
          <div className="space-y-6 max-w-lg mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Your Details</h2>
              <p className="text-slate-500 mt-1">Fill in your information to complete the booking</p>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="John Smith"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number (optional)
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+44 7123 456789"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Anything you'd like to discuss..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Booking Summary */}
            <Card className="bg-slate-50">
              <CardHeader>
                <CardTitle className="text-base">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service</span>
                  <span className="font-medium">{selectedService.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date</span>
                  <span className="font-medium">
                    {format(selectedDate, "MMMM d, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Your Time</span>
                  <span className="font-medium text-blue-600">
                    {formatInClientZone(selectedTime, "h:mm a")} ({clientTimezone})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">UK Time</span>
                  <span className="font-medium">
                    {formatInTimeZone(selectedTime, "Europe/London", "h:mm a")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Duration</span>
                  <span className="font-medium">{selectedService.duration} minutes</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep("datetime")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                size="lg"
                disabled={!clientName || !clientEmail || createBooking.isPending}
                onClick={handleSubmit}
              >
                {createBooking.isPending ? "Booking..." : "Confirm Booking"}
                {!createBooking.isPending && <Check className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === "confirm" && (
          <div className="max-w-lg mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-green-600" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Booking Confirmed!
              </h2>
              <p className="text-slate-500 mt-2">
                A confirmation email has been sent to{" "}
                <span className="font-medium text-slate-700">{clientEmail}</span>
              </p>
            </div>

            <Card className="text-left">
              <CardHeader>
                <CardTitle className="text-lg">Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service</span>
                  <span className="font-medium">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Your Time</span>
                  <span className="font-medium text-blue-600">
                    {selectedDate && selectedTime
                      ? `${format(selectedDate, "MMMM d, yyyy")} at ${formatInClientZone(selectedTime, "h:mm a")}`
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Your Timezone</span>
                  <span className="font-medium">{clientTimezone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">UK Time</span>
                  <span className="font-medium">
                    {selectedTime
                      ? formatInTimeZone(selectedTime, "Europe/London", "MMMM d, yyyy 'at' h:mm a")
                      : "-"}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-slate-500">Name</span>
                  <span className="font-medium">{clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email</span>
                  <span className="font-medium">{clientEmail}</span>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-slate-500">
              If you need to cancel or reschedule, please contact us at{" "}
              <a href="mailto:info@seeingtheeasyway.com" className="text-blue-600 hover:underline">
                info@seeingtheeasyway.com
              </a>
            </p>

            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                setStep("service");
                setSelectedServiceId(null);
                setSelectedDate(undefined);
                setSelectedTime(undefined);
                setClientName("");
                setClientEmail("");
                setClientPhone("");
                setNotes("");
              }}
            >
              Book Another Session
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
