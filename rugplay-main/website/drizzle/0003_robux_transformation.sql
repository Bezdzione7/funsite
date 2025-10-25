-- Migration to transform from crypto simulator to Robux platform
-- This migration updates the database schema to support Robux instead of fake crypto

-- Update user table to use Robux instead of base currency
ALTER TABLE "user" RENAME COLUMN "base_currency_balance" TO "robux_balance";
ALTER TABLE "user" ALTER COLUMN "robux_balance" SET DEFAULT 1000.00000000;

-- Update coin table to reflect Robux-based items
ALTER TABLE "coin" RENAME TO "item";
ALTER TABLE "item" RENAME COLUMN "name" TO "item_name";
ALTER TABLE "item" RENAME COLUMN "symbol" TO "item_code";
ALTER TABLE "item" RENAME COLUMN "creator_id" TO "seller_id";
ALTER TABLE "item" RENAME COLUMN "initial_supply" TO "total_quantity";
ALTER TABLE "item" RENAME COLUMN "circulating_supply" TO "available_quantity";
ALTER TABLE "item" RENAME COLUMN "current_price" TO "price_per_unit";
ALTER TABLE "item" RENAME COLUMN "market_cap" TO "total_value";
ALTER TABLE "item" RENAME COLUMN "volume_24h" TO "sales_24h";
ALTER TABLE "item" RENAME COLUMN "change_24h" TO "price_change_24h";
ALTER TABLE "item" RENAME COLUMN "pool_coin_amount" TO "inventory_amount";
ALTER TABLE "item" RENAME COLUMN "pool_base_currency_amount" TO "robux_reserve";

-- Update user_portfolio to user_inventory
ALTER TABLE "user_portfolio" RENAME TO "user_inventory";
ALTER TABLE "user_inventory" RENAME COLUMN "coin_id" TO "item_id";
ALTER TABLE "user_inventory" RENAME COLUMN "quantity" TO "owned_quantity";

-- Update transaction types for Robux platform
ALTER TYPE "transaction_type" RENAME TO "transaction_type_old";
CREATE TYPE "transaction_type" AS ENUM('PURCHASE', 'SALE', 'TRANSFER_IN', 'TRANSFER_OUT', 'ROBUX_DEPOSIT', 'ROBUX_WITHDRAWAL');
ALTER TABLE "transaction" ALTER COLUMN "type" TYPE "transaction_type" USING "type"::text::"transaction_type";
DROP TYPE "transaction_type_old";

-- Update comment table to reference items instead of coins
ALTER TABLE "comment" RENAME COLUMN "coin_id" TO "item_id";

-- Update price_history to item_price_history
ALTER TABLE "price_history" RENAME TO "item_price_history";
ALTER TABLE "item_price_history" RENAME COLUMN "coin_id" TO "item_id";
ALTER TABLE "item_price_history" RENAME COLUMN "price" TO "price_per_unit";

-- Add new tables for Robux payment system
CREATE TABLE IF NOT EXISTS "robux_transaction" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"amount" numeric(20, 8) NOT NULL,
	"transaction_type" varchar(50) NOT NULL,
	"external_transaction_id" text,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"processed_at" timestamp with time zone,
	"metadata" jsonb
);

-- Add Robux payment methods table
CREATE TABLE IF NOT EXISTS "payment_method" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"method_type" varchar(50) NOT NULL,
	"provider" varchar(50) NOT NULL,
	"account_details" jsonb NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Update foreign key constraints
ALTER TABLE "user_inventory" DROP CONSTRAINT IF EXISTS "user_portfolio_user_id_coin_id_pk";
ALTER TABLE "user_inventory" ADD CONSTRAINT "user_inventory_user_id_item_id_pk" PRIMARY KEY("user_id","item_id");

-- Add foreign key constraints for new tables
ALTER TABLE "robux_transaction" ADD CONSTRAINT "robux_transaction_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "payment_method" ADD CONSTRAINT "payment_method_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;

-- Update existing foreign key constraints
ALTER TABLE "item" ADD CONSTRAINT "item_seller_id_user_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "comment" ADD CONSTRAINT "comment_item_id_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."item"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "item_price_history" ADD CONSTRAINT "item_price_history_item_id_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."item"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "user_inventory" ADD CONSTRAINT "user_inventory_item_id_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."item"("id") ON DELETE cascade ON UPDATE no action;

-- Update unique constraints
ALTER TABLE "item" DROP CONSTRAINT IF EXISTS "coin_symbol_unique";
ALTER TABLE "item" ADD CONSTRAINT "item_code_unique" UNIQUE("item_code");
