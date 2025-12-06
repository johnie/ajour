"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const regex = /^https:\/\/omni\.se\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+/;

const schema = z.object({
  url: z.string().url().regex(regex),
});

export function SearchForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { url: "" },
  });

  function handleSubmit({ url }: z.infer<typeof schema>) {
    const [, article] = url.split("https://omni.se/");
    router.push(`/${article}`);
  }

  return (
    <Form {...form}>
      <form
        className="relative z-50 w-full"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="relative mx-auto w-full max-w-[350px] space-y-0 rounded-full md:max-w-[450px]">
              <FormControl>
                <Input
                  {...field}
                  className={cn(
                    "h-12 truncate rounded-full border-primary/15 bg-white/30 pr-28 pl-5 shadow-lg backdrop-blur-xs dark:bg-zinc-950/30",
                    form.formState.errors.url ? "ring-destructive!" : ""
                  )}
                  placeholder="https://omni.se/apple-uppges-jobba-pa-app-store-app-enbart-for-spel/a/pPKWKW"
                />
              </FormControl>
              <Button
                className="-translate-y-1/2 absolute top-1/2 right-2 rounded-full bg-secondary/35 text-zinc-900 dark:text-zinc-100"
                disabled={!form.formState.isValid}
                variant="outline"
              >
                Hämta
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
