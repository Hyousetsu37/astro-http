import { defineAction } from "astro:actions";
import { db, eq, Posts } from "astro:db";
import { z } from "astro:schema";

export const updatePostLikes = defineAction({
  input: z.object({
    postId: z.string(),
    increment: z.number(),
  }),
  accept: "json",
  handler: async ({ postId, increment }) => {
    const posts = await db.select().from(Posts).where(eq(Posts.id, postId));
    if (posts.length > 0) {
      const updatedResult = {
        ...posts.at(0),
        likes: posts.at(0)!.likes + increment,
      };
      await db.update(Posts).set(updatedResult).where(eq(Posts.id, postId));
    } else {
      const post = { id: postId, title: "Generated", likes: 0 + increment };
      await db.insert(Posts).values(post);
    }
  },
});
