'use server';

import { and, eq, gte, lte, like, SQL } from 'drizzle-orm';
import * as schema from '../../drizzle/schema';
import { getDataBase } from './drizzle';
import { users } from '../../drizzle/schema'; 


export async function deleteUser(userId: number): Promise<boolean> {
  try {
    const db = await getDataBase();

    await db.delete(users).where(eq(users.id, userId));

    return true; 
  } catch (error) {
    console.error('Failed to delete user:', error);
    return false; 
  }
}


export async function getUsers(page = 1, pageSize = 10) {
  const db = await getDataBase(); 

  const usersList = await db.query.users.findMany({
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });

  const totalRecords = await db.select({ id: schema.users.id }).from(users);
  const totalPages = Math.ceil(totalRecords.length / pageSize);

  return {
    users: usersList,
    totalPages,
  };
}

export async function createUser(username: string, password: string, isAdmin: boolean): Promise<boolean> {
  try {
    const db = await getDataBase(); 

    await db.insert(schema.users).values({ 
      username,
      password,
      isAdmin: isAdmin ? 1 : 0,
    });

    return true; 
  } catch (error) {
    console.error('Failed to create user:', error);
    return false; 
  }
}

export async function getPeoples(page = 1, pageSize = 5) {
  const db = await getDataBase();

  const peoples = await db.query.people.findMany({
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });

  const totalRecords = await db
    .select({ id: schema.people.id })
    .from(schema.people);
  const totalPages = Math.ceil(totalRecords.length / pageSize);

  return { peoples, totalPages };
}

export async function addPeople(people: typeof schema.people.$inferInsert) {
  const db = await getDataBase();

  const response = await db.insert(schema.people).values(people);

  console.log(response);
}

export async function login(username: string, password: string) {
  const db = await getDataBase();
  const response = await db.query.users.findFirst({
    where: eq(schema.users.username, username),
  });
  if (!response) return;
  if (response.password === password) return response;
  return;
}

export async function getPeople(id: number) {
  const db = await getDataBase();
  const response = await db.query.people.findFirst({
    where: eq(schema.people.id, id),
  });
  return response;
}

export async function getPeopleBetweenDates(start: Date, end: Date) {
  const db = await getDataBase();

  const response = await db.query.people.findMany({
    where: and(
      gte(schema.people.admissionDate, start.toISOString()),
      lte(schema.people.admissionDate, end.toISOString()),
    ),
  });

  return response;
}

export async function updatePeople(
  id: number,
  data: typeof schema.people.$inferInsert,
) {
  const db = await getDataBase();
  await db.update(schema.people).set(data).where(eq(schema.people.id, id));
  return;
}

export async function getAssistSocial(peopleId: number) {
  const db = await getDataBase();
  const assistSocial = await db.query.assistSocial.findFirst({
    where: eq(schema.assistSocial.peopleId, peopleId),
  });

  if (assistSocial) return assistSocial;

  await db
    .insert(schema.assistSocial)
    .values({ peopleId, contentText: 'Nada por aqui.' });

  return await getAssistSocial(peopleId);
}

export async function updateAssistSocial(id: number, text: string) {
  const db = await getDataBase();
  await db
    .update(schema.assistSocial)
    .set({ contentText: text })
    .where(eq(schema.assistSocial.id, id));
}

export async function finalizeCheckout(
  id: number,
  checkoutDate: string,
  checkoutReason: string
) {
  const db = await getDataBase();
  await db
    .update(schema.people)
    .set({ checkoutDate, checkoutReason })
    .where(eq(schema.people.id, id));
  return;
}