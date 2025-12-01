


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  new.updated_at = now();
  return new;
end;
$$;


ALTER FUNCTION "public"."set_current_timestamp_updated_at"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."members" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "age" integer NOT NULL,
    "phone_country_code" "text" NOT NULL,
    "phone_number" "text" NOT NULL,
    "organisation" "text",
    "country" character(2),
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "profile" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "profile_last_updated_at" timestamp with time zone,
    "profile_source" "text" DEFAULT 'ai_seed'::"text" NOT NULL,
    CONSTRAINT "members_age_check" CHECK ((("age" >= 13) AND ("age" <= 120))),
    CONSTRAINT "members_profile_food_diettype_check" CHECK (((("profile" -> 'food'::"text") IS NULL) OR ((("profile" -> 'food'::"text") ->> 'dietType'::"text") = ANY (ARRAY['veg'::"text", 'non_veg'::"text", 'vegan'::"text", 'mixed'::"text", 'unknown'::"text"]))))
);


ALTER TABLE "public"."members" OWNER TO "postgres";


ALTER TABLE ONLY "public"."members"
    ADD CONSTRAINT "members_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."members"
    ADD CONSTRAINT "members_phone_unique" UNIQUE ("phone_country_code", "phone_number");



ALTER TABLE ONLY "public"."members"
    ADD CONSTRAINT "members_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_members_country" ON "public"."members" USING "btree" ("country");



CREATE INDEX "idx_members_email" ON "public"."members" USING "btree" ("email");



CREATE INDEX "idx_members_profile_gin" ON "public"."members" USING "gin" ("profile");



CREATE OR REPLACE TRIGGER "set_timestamp_on_members" BEFORE UPDATE ON "public"."members" FOR EACH ROW EXECUTE FUNCTION "public"."set_current_timestamp_updated_at"();



CREATE POLICY "Members can insert their own row" ON "public"."members" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "id"));



CREATE POLICY "Members can update their own row" ON "public"."members" FOR UPDATE USING (("auth"."uid"() = "id"));



CREATE POLICY "Members can view their own row" ON "public"."members" FOR SELECT USING (("auth"."uid"() = "id"));



ALTER TABLE "public"."members" ENABLE ROW LEVEL SECURITY;


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON FUNCTION "public"."set_current_timestamp_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_current_timestamp_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_current_timestamp_updated_at"() TO "service_role";



GRANT ALL ON TABLE "public"."members" TO "anon";
GRANT ALL ON TABLE "public"."members" TO "authenticated";
GRANT ALL ON TABLE "public"."members" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";







RESET ALL;
