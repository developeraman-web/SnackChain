import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getEnv } from "@/helpers/getEnv";
import { useNavigate } from "react-router";
import { showToast } from "@/helpers/showToast";
import { useDispatch } from "react-redux";
import slugify from "slugify";

export default function AddCampus() {
  const formSchema = z.object({
    collegeName: z.string().min(3, {
      message: "campus name is required",
    }),
    city: z.string().min(3, {
      message: "campus name is required",
    }),
    state: z.string().min(3, {
      message: "campus name is required",
    }),
    slug: z.string(),
  });
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === "collegeName" && value.collegeName) {
        const slug = slugify(value.collegeName, {
          lower: true,
          replacement: "-",
        });
        form.setValue("slug", slug);
      } else if (name === "collegeName" && !value.collegeName) {
        form.setValue("slug", "");
      }
    });
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collegeName: "",
      city: "",
      state: "",
      slug: "",
    },
  });
  const onSubmit = async (values) => {
    try {
      const res = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/campus/register`,
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        return showToast("error", data.message);
      }

      showToast("success", data.message);
      form.reset();
    } catch (error) {
      return showToast("error", error.message);
    }
  };
  return (
    <div className="">
      <Card className={"w-full p-5"}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mb-2">
              <FormField
                control={form.control}
                name="collegeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>collegeName</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter college " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-2">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-2">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>state</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter state" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>city</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-5">
              <Button className={"w-full"} type="submit">
                Register
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
