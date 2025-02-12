'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { File, Folder, History } from "lucide-react";
import { Button } from "./ui/button";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

dayjs.extend(relativeTime);
export type CodeTreeRow = {
  type: "file" | "folder";
  fileName: string;
  commitMessage: string;
  commitMessageUrl: string;
  prId: string;
  lastModified: string;
};

export type CodeTreeTableProps = {
  rows: CodeTreeRow[];
  branchName: string;
  repoUrl: string;
  lastCommitMessage: string;
  lastCommitMessageUrl: string;
  lastCommitid: string;
  lastCommitModifiedTime: string;
  totalCommits: string;
  lastCommitAuthorName: string;
  lastCommitAuthorImageSrcUrl: string;
  lastCommitPrId: string;
};

export function CodeTreeTable({
  rows,
  branchName,
  repoUrl,
  lastCommitMessage,
  lastCommitMessageUrl,
  lastCommitPrId,
  lastCommitid,
  lastCommitModifiedTime,
  totalCommits,
  lastCommitAuthorName,
  lastCommitAuthorImageSrcUrl,
}: CodeTreeTableProps) {
  return (
      <Table className="w-full">
        <TableHeader className="bg-gray-100">
          <TableRow className="border-none rounded-md">
            <TableHead className="w-[150px] sm:w-[150px] md:w-[180px] lg:w-[255px] xl:w-[355px] h-0"></TableHead>
            <TableHead className="w-136px lg:w-[245px] xl:w-[400px] md:w-[140px] h-0 hidden md:table-cell"></TableHead>
            <TableHead className="text-right sm:w-[136px] w-[136px] h-0"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-gray-100 hover:bg-gray-100 border-none rounded-md">
            <TableCell colSpan={3} className="p-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="w-5 h-5 rounded-full">
                    <AvatarImage
                      src={lastCommitAuthorImageSrcUrl}
                      alt={"profile_image"}
                    />
                    <AvatarFallback>{lastCommitAuthorName[0]}</AvatarFallback>
                  </Avatar>
                  <h5 className="font-bold mx-2">{lastCommitAuthorName}</h5>
                  <h5 title={lastCommitMessage} className="text-ellipsis truncate hidden md:block md:max-w-36 lg:max-w-48 xl:max-w-[422px] hover:underline hover:text-[#0969DA]">
                    <a href={lastCommitMessageUrl}>
                      {lastCommitMessage}
                      {"("}
                      <a href={`${repoUrl}/pull/${lastCommitPrId}`}>
                        #{lastCommitPrId}
                      </a>
                      {")"}
                    </a>
                  </h5>
                </div>
                <div className="flex items-center justify-end gap-1 flex-shrink-0">
                  <a
                    href={lastCommitMessageUrl}
                    className="hidden md:inline hover:underline hover:text-[#0969DA] text-xs"
                  >
                    {lastCommitid.substring(0,7)}
                  </a>
                  <span className="hidden md:inline mx-1">.</span>
                  <h5
                    title={dayjs(lastCommitModifiedTime).format(
                      "MMM DD, YYYY, hh:mm A [GMT]Z"
                    )}
                    className="hidden md:inline text-xs"
                  >
                    {dayjs().to(dayjs(lastCommitModifiedTime))}
                  </h5>
                  <a href={`${repoUrl}/commit/${branchName}`}>
                    <Button variant={"ghost"} className="hover:bg-gray-200" size="xsm">
                      <History size={1} />
                      <span className="hidden lg:inline text-xs">{totalCommits} Commits</span>
                    </Button>
                  </a>
                </div>
              </div>
            </TableCell>
          </TableRow>
          {rows.map((row,index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {row.type == "file" ? (
                      <File size={18} />
                    ) : (
                      <Folder
                        size={18}
                        fill="rgb(84, 174, 255)"
                        color="rgb(84, 174, 255)"
                      />
                    )}
                    <a
                      href={
                        row.type == "file"
                          ? `${repoUrl}/tree/blob/${branchName}/${row.fileName}`
                          : `${repoUrl}/tree/${branchName}/${row.fileName}`
                      }
                    >
                      <h5
                        title={row.fileName}
                        className="truncate w-[110px] sm:w-[115px] md:w-[145px] lg:w-[220px] xl:w-[320px]  hover:underline hover:text-[#0969DA]"
                      >
                        {row.fileName}
                      </h5>
                    </a>
                  </div>
                </TableCell>
                <TableCell className="md:table-cell hidden">
                  <h5
                    title={row.commitMessage}
                    className="truncate w-120px md:w-[120px] lg:w-[225px] xl:w-[380px]"
                  >
                    <a
                      href={row.commitMessageUrl}
                      className="hover:underline hover:text-[#0969DA]"
                    >
                      {row.commitMessage}
                      {"("}
                        <span
                          // href={`${repoUrl}/pull/${row.prId}`}
                          className="hover:underline text-[#0969DA]"
                        >
                          #{row.prId}
                        </span>
                      {")"}
                    </a>
                  </h5>
                </TableCell>
                <TableCell>
                  <h5
                    title={dayjs(row.lastModified).format(
                      "MMM DD, YYYY, hh:mm A Z"
                    )}
                    className="text-right w-[135px]"
                  >
                    {dayjs().to(dayjs(row.lastModified))}
                  </h5>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
  );
}
