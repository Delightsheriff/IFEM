import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { IconType } from "react-icons";

export const headerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Guides", href: "/guides" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const ICON_MAP: Record<string, IconType> = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  twitter: FaXTwitter,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  linkedin: FaLinkedin,
};

export const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Partner Institutions", href: "/institutions" },
  ],
  resources: [
    { label: "Guides", href: "/guides" },
    { label: "FAQ", href: "/faq" },
  ],
  contact: [
    { label: "Contact Us", href: "/contact" },
    { label: "Office Locations", href: "/contact#locations" },
    { label: "Meet Our Team", href: "/contact#team" },
  ],
};
