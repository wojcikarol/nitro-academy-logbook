import { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserPlus, Loader2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

const schema = z.object({
  name: z
    .string()
    .min(2, "Imię musi mieć min. 2 znaki")
    .max(40, "Maks. 40 znaków")
    .regex(/^[\p{L}\s'-]+$/u, "Tylko litery, spacje, '-'"),
  handle: z
    .string()
    .min(2, "Pseudonim min. 2 znaki")
    .max(20, "Maks. 20 znaków")
    .regex(/^@?[a-zA-Z0-9_]+$/, "Tylko litery, cyfry i _"),
});

type FormValues = z.infer<typeof schema>;

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
};

const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { id, label, error, ...rest },
  ref,
) {
  const errId = `${id}-err`;
  return (
    <label htmlFor={id} className="flex flex-col gap-1">
      <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        id={id}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        className={[
          "h-11 rounded-md bg-input/80 border px-3 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-ring",
          error ? "border-destructive" : "border-border",
        ].join(" ")}
        {...rest}
      />
      {error && (
        <span id={errId} role="alert" className="text-xs text-destructive">
          {error}
        </span>
      )}
    </label>
  );
});

export function DriverForm() {
  const { addUser, users } = useStore();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { name: "", handle: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 250));
      const handle = values.handle.startsWith("@") ? values.handle : `@${values.handle}`;
      const exists = users.some(
        (u) =>
          u.handle.toLowerCase() === handle.toLowerCase() ||
          u.name.toLowerCase() === values.name.trim().toLowerCase(),
      );
      if (exists) {
        toast.error("Taki kierowca już istnieje");
        setSubmitting(false);
        return;
      }
      const u = await addUser(values);
      toast.success("Kierowca dodany", { description: `${u.name} ${u.handle}` });
      reset();
    } catch (e) {
      toast.error("Błąd zapisu", { description: (e as Error).message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="glass rounded-xl p-5" aria-labelledby="driver-form-title">
      <header className="flex items-center gap-2 mb-4">
        <UserPlus className="h-4 w-4 text-amber" aria-hidden />
        <h3 id="driver-form-title" className="font-display text-lg uppercase tracking-widest">
          Dodaj kierowcę
        </h3>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3" noValidate>
        <Field
          id="driver-name"
          label="Imię"
          placeholder="np. Tomek"
          autoComplete="off"
          error={errors.name?.message}
          {...register("name")}
        />
        <Field
          id="driver-handle"
          label="Pseudonim"
          placeholder="np. @speedy"
          autoComplete="off"
          error={errors.handle?.message}
          {...register("handle")}
        />

        <button
          type="submit"
          disabled={submitting || !isValid}
          className="h-11 inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground font-display uppercase tracking-[0.2em] hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <UserPlus className="h-4 w-4" />
          )}
          <span>{submitting ? "Zapisuję…" : "Dodaj"}</span>
        </button>

        <p className="text-[11px] text-muted-foreground">
          Łącznie kierowców: <span className="font-mono text-foreground">{users.length}</span>
        </p>
      </form>
    </section>
  );
}
