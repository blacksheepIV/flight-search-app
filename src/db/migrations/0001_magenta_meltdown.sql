CREATE TABLE "bookmarked_flights" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"flight_id" text NOT NULL,
	"origin_iata" text NOT NULL,
	"destination_iata" text NOT NULL,
	"departure_time" timestamp NOT NULL,
	"arrival_time" timestamp NOT NULL,
	"duration_minutes" integer NOT NULL,
	"price_total" text NOT NULL,
	"price_currency" text NOT NULL,
	"airline_name" text NOT NULL,
	"airline_code" text NOT NULL,
	"bookmarked_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "saved_searches" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"origin_iata" text NOT NULL,
	"origin_city" text NOT NULL,
	"destination_iata" text NOT NULL,
	"destination_city" text NOT NULL,
	"departure_date" date NOT NULL,
	"return_date" date,
	"is_round_trip" boolean NOT NULL,
	"passengers" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "bookmarked_flights" ADD CONSTRAINT "bookmarked_flights_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_searches" ADD CONSTRAINT "saved_searches_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;