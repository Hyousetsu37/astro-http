import { getCollection } from "astro:content";
import { Clients, db, Posts } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  // TODO

  const posts = await getCollection("blog");

  await db.insert(Clients).values([
    { id: 1, name: "Kasim", age: 35, isActive: true },
    { id: 2, name: "David", age: 28, isActive: true },
    { id: 3, name: "Maria", age: 25, isActive: false },
    { id: 4, name: "Shawn", age: 26, isActive: true },
  ]);

  // await db.insert(Posts).values(
  //   posts.map((post) => ({
  //     id: post.id,
  //     title: post.data.title,
  //     likes: Math.round(Math.random() * 100),
  //   }))
  // );

  console.log("Seed executed");
}
