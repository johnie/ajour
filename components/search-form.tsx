'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const regex = /^https:\/\/omni\.se\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+/;

const schema = z.object({
  url: z.string().url().regex(regex),
});

export function SearchForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { url: '' },
  });

  function handleSubmit({ url }: z.infer<typeof schema>) {
    const [, article] = url.split('https://omni.se/');
    console.log(url, article);
    router.push(`/${article}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="relative z-50 w-full"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="relative mx-auto w-full max-w-[350px] space-y-0 md:max-w-[450px]">
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://omni.se/apple-uppges-jobba-pa-app-store-app-enbart-for-spel/a/pPKWKW"
                  className={cn(
                    'h-12 truncate rounded-full border-primary/15 pl-5 pr-28 shadow-lg backdrop-blur-sm bg-white/30 dark:bg-zinc-950/30',
                    form.formState.errors.url && '!ring-destructive'
                  )}
                />
              </FormControl>
              <Button
                variant="outline"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-secondary/35 text-zinc-900 dark:text-zinc-100"
                disabled={!form.formState.isValid}
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
