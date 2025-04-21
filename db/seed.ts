import { Clients, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  // TODO

  await db.insert(Clients).values([
    { id: 1, name: "Kasim", age: 35, isActive: true },
    { id: 2, name: "David", age: 28, isActive: true },
    { id: 3, name: "Maria", age: 25, isActive: false },
    { id: 4, name: "Shawn", age: 26, isActive: true },
  ]);

  console.log("Seed executed");
}
