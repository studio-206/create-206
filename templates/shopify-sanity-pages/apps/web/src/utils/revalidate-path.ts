export async function revalidatePath(path: string) {
  if (!path) return null;

  const rev = await fetch(
    `${process.env.NEXT_PUBLIC_CANONICAL}/api/revalidate?path=${path}&secret=${process.env.NEXT_PUBLIC_REVALIDATE_KEY}`,
  );

  return rev;
}
