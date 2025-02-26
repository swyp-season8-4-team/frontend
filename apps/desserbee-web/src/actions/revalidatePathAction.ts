'use server';

import { revalidatePath } from 'next/cache';

/**
 * @docs https://nextjs.org/docs/app/api-reference/functions/revalidatePath
 * @param path
 * @param type
 */
export async function revalidatePathAction(
  path: string,
  type?: 'layout' | 'page'
) {
  revalidatePath(path, type);
}
