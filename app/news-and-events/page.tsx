import { permanentRedirect } from "next/navigation";

export default function NewsAndEventsRedirect() {
  permanentRedirect("/events");
}
