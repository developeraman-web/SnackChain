import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
// import moment from "moment";
import { showToast } from "@/helpers/showToast";
import { RouteAddCampus } from "@/helpers/RouteNames";
// import { deleteData } from "@/helpers/handleDelete";

export default function CampusDetails() {
  const [refreshData, setRefreshData] = useState(false);
  const {
    data: campusData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/campus/get-all`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );
  const handleClick = async (id) => {
    const del = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/campus/delete/${id}`
    );
    if (del) {
      setRefreshData(!refreshData);
      showToast("success", "Data Deleted successfully");
    }
  };
  if (loading) {
    return <div>Loading..</div>;
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteAddCampus}>Add campus</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table className={"overflow-x-auto"}>
            <TableCaption> All campus Details</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>college</TableHead>
                <TableHead>state</TableHead>
                <TableHead>city</TableHead>
                <TableHead>Registered on</TableHead>
                <TableHead className={"text-right"}>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campusData &&
              campusData.campus &&
              campusData.campus.length > 0 ? (
                <>
                  {campusData?.campus?.map((campus, index) => {
                    return (
                      <TableRow key={campus._id}>
                        <TableCell>{campus?.collegeName}</TableCell>
                        <TableCell>{campus?.state}</TableCell>
                        <TableCell
                          className={"whitespace-normal break-words max-w-xs"}
                        >
                          {campus?.city}
                        </TableCell>

                        <TableCell>
                          {/* {moment(campus?.createdAt).format("DD-MM-YYYY")} */}
                          date
                        </TableCell>
                        <TableCell className={"text-right"}>
                          <Button
                            variant={"outline"}
                            className={
                              "hover:bg-violet-500 hover:text-white mx-1"
                            }
                            asChild
                          >
                            <Link to={""}>
                              <CiEdit />
                            </Link>
                          </Button>
                          <Button
                            variant={"outline"}
                            className={
                              "hover:bg-violet-500 hover:text-white mx-1"
                            }
                            size={"icon"}
                            onClick={() => handleClick(campus._id)}
                          >
                            <FaRegTrashCan />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </>
              ) : (
                <>
                  <TableRow>
                    <TableCell colSpan={"3"}>Data not found</TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
