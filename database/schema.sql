-- USERS TABLE
create table users (
  id uuid primary key,
  name text not null,
  email text unique,
  role text not null,
  school_id text unique,
  created_at timestamp default now()
);

-- PARENTS
create table parents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  name text,
  email text,
  phone text
);

-- STUDENTS
create table students (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  name text,
  class text,
  section text,
  parent_id uuid references parents(id),
  created_at timestamp default now()
);

-- SUBJECTS
create table subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null
);

-- STAFF
create table staff (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  name text,
  role text,
  subject_id uuid references subjects(id),
  is_class_coordinator boolean default false,
  assigned_class text,
  assigned_section text
);

-- TIMETABLE
create table timetable (
  id uuid primary key default gen_random_uuid(),
  class text,
  section text,
  subject_id uuid,
  teacher_id uuid,
  day text,
  start_time time,
  end_time time
);

-- ATTENDANCE
create table attendance (
  id uuid primary key default gen_random_uuid(),
  student_id uuid,
  subject_id uuid,
  date date,
  status text,
  teacher_id uuid
);

-- RESULTS
create table results (
  id uuid primary key default gen_random_uuid(),
  student_id uuid,
  subject_id uuid,
  marks int,
  grade text,
  exam text
);

-- FEES
create table fees (
  id uuid primary key default gen_random_uuid(),
  student_id uuid,
  amount numeric,
  status text,
  due_date date
);
