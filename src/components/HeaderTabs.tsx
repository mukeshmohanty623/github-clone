import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  Code,
  GitPullRequestArrow,
  CirclePlay,
  PanelsTopLeft,
  ShieldAlert,
  ChartLine,
  CircleDot,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "./ui/separator";



export const HeaderTabs = () => {
  const [currentTabValue, setCurrentTabValue] = useState("code");

  return (
    <Tabs
      defaultValue="code"
      className="w-full"
      onValueChange={(value) => {
        setCurrentTabValue(value);
      }}
    >
      <TabsList className="mx-5">
        <TabsTrigger value="code" className="gap-2">
          <Code size={"20"} />
          Code
        </TabsTrigger>
        <TabsTrigger value="issues" className="gap-2">
          <CircleDot size={"20"} />
          Issues
          <Badge variant={"secondary"}>12</Badge>
        </TabsTrigger>
        <TabsTrigger value="pullRequest" className="gap-2" disabled>
          <GitPullRequestArrow size={"20"} />
          Pull requests
          <Badge variant={"secondary"}>12</Badge>
        </TabsTrigger>
        <TabsTrigger value="actions" className="gap-2" disabled>
          <CirclePlay size={"20"} />
          Actions
          <Badge variant={"secondary"}>12</Badge>
        </TabsTrigger>
        <TabsTrigger value="projects" className="gap-2" disabled>
          <PanelsTopLeft size={"20"} />
          Projects
          <Badge variant={"secondary"}>12</Badge>
        </TabsTrigger>
        <TabsTrigger value="security" className="gap-2" disabled>
          <ShieldAlert size={"20"} />
          Security
          <Badge variant={"secondary"}>12</Badge>
        </TabsTrigger>
        <TabsTrigger value="insights" className="gap-2" disabled>
          <ChartLine size={"20"} />
          Insights
          <Badge variant={"secondary"}>12</Badge>
        </TabsTrigger>
      </TabsList>
      <Separator className="my-2" />
      <TabsContent value={currentTabValue}></TabsContent>
    </Tabs>
  );
};
