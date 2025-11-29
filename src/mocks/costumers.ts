import profile1 from "../assets/profile1.jpeg";
import profile2 from "../assets/profile2.jpeg";
import profile3 from "../assets/profile3.jpeg";

import type { Client } from "../types/clients";

export const customers: Client[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@gmail.com",
    phone: "912345678",
    photo: profile3,
    archived: false,
  },
  {
    id: 2,
    name: "Maria Costa",
    email: "maria@gmail.com",
    phone: "923456789",
    photo: profile2,
    archived: false,
  },
  {
    id: 3,
    name: "Ana Santos",
    email: "ana@example.com",
    phone: "934567890",
    photo: profile1,
    archived: false,
  },
];
