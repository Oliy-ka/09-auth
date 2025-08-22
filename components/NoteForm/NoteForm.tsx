import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import type { Note } from "@/types/note";

interface NoteFormProps{
    onSuccess: () => void;
    onCancel?: () => void;
}
interface FormValues {
  title: string;
  content: string;
  tag: "" | Note["tag"];
}

export default function NoteForm({ onSuccess, onCancel }: NoteFormProps) {
    const NoteFormSchema = Yup.object().shape({
        title: Yup.string().required("This field is required").min(3, "Title  must be at least 3 characters").max(50, "Title is too long"),
        content: Yup.string().max(500, "Content is too long"),
        tag: Yup.string().required("Please select a tag").oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag selected"),
    });

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
    mutationFn: (values: FormValues) => createNote({
      title: values.title,
      content: values.content,
      tag: values.tag as Note["tag"]
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onSuccess();
    },
  });

    return (
        <Formik initialValues={{ title: "", content: "", tag: "" }} onSubmit={(values: FormValues) => mutate(values)} validationSchema={NoteFormSchema}>
            {
                <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor="title">Title</label>
                    <Field id="title" type="text" name="title" className={css.input} />
                    <ErrorMessage name="title" component="span" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="content">Content</label>
                    <Field as="textarea"
                    id="content"
                    name="content"
                    rows={8}
                    className={css.textarea}
                    />
                    <ErrorMessage name="content" component="span" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="tag">Tag</label>
                    <Field as="select" id="tag" name="tag" className={css.select}>
                    <option value="">Select a tag</option>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage name="tag" component="span" className={css.error} />
                </div>

                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={onCancel || onSuccess}>
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className={css.submitButton}
                    disabled={isPending}
                    >
                    {isPending ? "Creating..." : "Create note"}
                    </button>
                </div>
            </Form>
            }
        </Formik>
    );
}