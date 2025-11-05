import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaHandshake } from "react-icons/fa";
import validator from "validator";

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

const formSchema = z.object({
  restaurantName: z.string().min(3, { message: "Restaurant name is required" }),
  campus: z.string().min(1, { message: "Campus is required" }),
  tag: z.string().min(1, { message: "tag is required" }),

  restaurantContact: z
    .string()
    .min(10)
    .refine((val) => validator.isMobilePhone(val), {
      message: "Invalid phone number",
    }),

  ownerName: z.string().min(3, { message: "Owner name is required" }),
  ownerEmail: z.string().email({ message: "Invalid email address" }),
  ownerContact: z
    .string()
    .min(10)
    .refine((val) => validator.isMobilePhone(val), {
      message: "Invalid phone number",
    }),
});

export default function RegisterRestaurant() {
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
      restaurantName: "",
      campus: "",
      tag: "",
      restaurantContact: "",
      ownerName: "",
      ownerEmail: "",
      ownerContact: "",
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
    formData.append("restaurantName", values.restaurantName);
    formData.append("campus", values.campus);
    formData.append("restaurantContact", values.restaurantContact);
    formData.append("slug", slugify(values.restaurantName));
    formData.append("ownerName", values.ownerName);
    formData.append("ownerEmail", values.ownerEmail);
    formData.append("ownerContact", values.ownerContact);
    formData.append("tag", values.tag);

    formData.append("file", file);

    try {
      const res = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/business/register`,
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center max-w-4xl mx-auto ">
      <h1 className="py-3 mb-4 md:text-3xl text-md flex items-center gap-2">
        {" "}
        <FaHandshake size={40} className="text-amber-950" />
        Become a Partner Restaurant
      </h1>
      <Card className="w-full p-8 shadow-xl shadow-amber-950">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            {/* -------------------- Restaurant Details -------------------- */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                🏬 Restaurant Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Restaurant Name */}
                <FormField
                  control={form.control}
                  name="restaurantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Restaurant Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter restaurant name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Campus */}
                <FormField
                  control={form.control}
                  name="campus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campus</FormLabel>
                      <FormControl>
                        <Select
                          className={"w-full"}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a campus" />
                          </SelectTrigger>
                          <SelectContent>
                            {campusData?.campus?.map((campus) => (
                              <SelectItem key={campus._id} value={campus._id}>
                                {campus.collegeName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Restaurant Contact */}
                <FormField
                  control={form.control}
                  name="restaurantContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Restaurant Contact</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Feature Image */}
                <div className="flex flex-col gap-3">
                  <FormLabel>Feature Image</FormLabel>
                  <Dropzone
                    onDrop={(acceptedFiles) => handleFile(acceptedFiles)}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="flex justify-center items-center w-36 h-28 border-2 border-dashed p-3 rounded-2xl cursor-pointer">
                          <img src={filePreview} alt="" />
                          {!file && (
                            <p className="text-gray-400">Select an image</p>
                          )}
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>
            </div>
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
                      <SelectTrigger>
                        <SelectValue placeholder="veg or non-veg" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"veg"}>Veg</SelectItem>
                        <SelectItem value={"non-veg"}>Non-Veg</SelectItem>
                        <SelectItem value={"both"}>Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* -------------------- Owner Details -------------------- */}
            <div>
              <h2 className="text-xl font-semibold mb-4">👤 Owner Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Owner Name */}
                <FormField
                  control={form.control}
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter owner's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Owner Email */}
                <FormField
                  control={form.control}
                  name="ownerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Owner Contact */}
                <FormField
                  control={form.control}
                  name="ownerContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Contact</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact number" {...field} />
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
                Register Restaurant
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
