const formSchema = z.object({
  name: z.string().min(3, {
    message: "campus name is required",
  }),
  price: z
    .string()
    .nonempty({ message: "Price is required" })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Price must be a number" })
    .refine((val) => val > 0, { message: "Price must be positive" }),
  category: z.string().min(3, {
    message: "category required",
  }),
  tag: z.string({ message: "select a tag for your dish" }),
  description: z.string({ message: "write a description" }),
});
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoFastFoodSharp } from "react-icons/io5";
import { Textarea } from "@/components/ui/textarea";
import { BiRupee } from "react-icons/bi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useFetch } from "@/hooks/useFetch";
import Dropzone from "react-dropzone";
import slugify from "slugify";
import { useSelector } from "react-redux";

export default function AddDish() {
  const restaurant = useSelector((state) => state.restaurant);
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();
  const { data: campusData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/campus/get-all`,
    {
      method: "get",
      credentials: "include",
    }
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tag: "",
      category: "",
      description: "",
    },
  });
  const handleFile = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category", values.category);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("tag", values.tag);
    formData.append("file", file);

    try {
      const res = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/menu/add/${
          restaurant ? restaurant.restaurant._id : ""
        }`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) {
        showToast("error", data.message);
        return;
      }

      showToast("success", data.message);
      setFile(null);
      setFilePreview(null);
      form.reset();
      form.resetField("tag");
    } catch (err) {
      showToast("error", err.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-4xl mx-auto ">
      <h1 className="py-3 mb-4 md:text-3xl text-md flex items-center gap-2">
        {" "}
        <IoFastFoodSharp size={40} className="text-amber-950" />
        Add your Dish to Menu
      </h1>
      <Card className="w-full p-8 shadow-xl shadow-amber-950">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter dish title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Pizza or Burger or Roll"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Restaurant Contact */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Price <BiRupee />
                      </FormLabel>

                      <FormControl>
                        <Input
                          min="0"
                          onWheel={(e) => e.target.blur()}
                          type={"number"}
                          placeholder="Enter Price"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tag</FormLabel>
                      <FormControl>
                        <Select
                          className={"w-full"}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className={"w-full"}>
                            <SelectValue placeholder="veg or non-veg" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"veg"}>Veg</SelectItem>
                            <SelectItem value={"non-veg"}>Non-Veg</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <FormLabel>Thumb Image</FormLabel>
              <Dropzone onDrop={(acceptedFiles) => handleFile(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="flex justify-center items-center w-full h-64 border-2 border-dashed p-7 rounded-2xl cursor-pointer">
                      <img
                        className="w-full h-full"
                        src={filePreview}
                        alt="Select an image"
                      />
                      {!file && (
                        <p className="text-gray-400">Select an image</p>
                      )}
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className={"col-span-2"}>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Delicious and freshly prepared with handpicked ingredients."
                          className="w-full col-span-full border-2 min-h-20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button type="submit" className="w-full bg-stone-700">
                Add
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
