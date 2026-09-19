import { google, calendar_v3 } from "googleapis";
import { env } from "./env";

const oauth2Client = new google.auth.OAuth2(
  env.googleClientId,
  env.googleClientSecret,
  env.googleRedirectUri,
);

// Scopes needed for Google Calendar
export const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
];

export function getGoogleAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: GOOGLE_SCOPES,
    prompt: "consent",
  });
}

export async function getTokensFromCode(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

export function setCredentials(tokens: {
  access_token?: string | null;
  refresh_token?: string | null;
}) {
  oauth2Client.setCredentials(tokens);
}

export async function createCalendarEvent(params: {
  tokens: { access_token?: string | null; refresh_token?: string | null };
  summary: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  timezone: string;
  attendeeEmail?: string;
}): Promise<string> {
  const { tokens, summary, description, startDateTime, endDateTime, timezone, attendeeEmail } =
    params;

  setCredentials(tokens);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const attendees: calendar_v3.Schema$EventAttendee[] = [];
  if (attendeeEmail) {
    attendees.push({ email: attendeeEmail });
  }

  const event = await calendar.events.insert({
    calendarId: "primary",
    requestBody: {
      summary,
      description,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: timezone,
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: timezone,
      },
      attendees,
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 1440 }, // 24 hours before
          { method: "popup", minutes: 30 }, // 30 minutes before
        ],
      },
    },
  });

  return event.data.id ?? "";
}

export async function deleteCalendarEvent(params: {
  tokens: { access_token?: string | null; refresh_token?: string | null };
  eventId: string;
}) {
  const { tokens, eventId } = params;
  setCredentials(tokens);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  await calendar.events.delete({
    calendarId: "primary",
    eventId,
  });
}

export async function listUpcomingEvents(params: {
  tokens: { access_token?: string | null; refresh_token?: string | null };
  maxResults?: number;
  timeMin?: Date;
}) {
  const { tokens, maxResults = 10, timeMin = new Date() } = params;
  setCredentials(tokens);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const response = await calendar.events.list({
    calendarId: "primary",
    timeMin: timeMin.toISOString(),
    maxResults,
    singleEvents: true,
    orderBy: "startTime",
  });

  return response.data.items ?? [];
}
