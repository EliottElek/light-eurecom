import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import clsx from "clsx"

interface CodeViewerProps {
  routers: readonly string[]
}

interface CodeProps {
  children: React.ReactNode,
  title?: string,
  status?: 'pending' | 'error' | 'complete'
}

const statuses = {
  "pending": "border-slate-100/20 text-slate-100",
  "error": "border-red-200/20 text-red-400",
  "complete": "border-green-200/20 text-green-400"
}

export function CodeViewer({ routers }: CodeViewerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">View config</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>View config</DialogTitle>
          <DialogDescription>
            You can use the following configuration files to understand how it works on the end.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="server.ini">server.ini</TabsTrigger>
            <TabsTrigger value="receiver.ini">receiver.ini</TabsTrigger>
          </TabsList>
          <TabsContent value="server.ini">
            <div className="grid gap-4 w-full">
              <Code>
                <span className="text-primary font-bold">[server]</span>
                <p>multicast_groups = [{routers?.join(", \n")}]</p>
                <span>library_file = library.json</span>
                <span className="text-primary font-bold">[unicast_server]</span>
                <span>unicast_ip = 127.0.0.1</span>
              </Code>
              <div>
                <p className="text-sm text-muted-foreground">
                  Your API Key can be found here. You should use environment
                  variables or a secret management tool to expose your key to your
                  applications.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="receiver.ini">
            <div className="grid gap-4">
              <Code>
                <span className="text-primary font-bold">[unicast_server]</span>
                <span>unicast_ip = 127.0.0.1</span>
              </Code>
              <div>
                <p className="text-sm text-muted-foreground">
                  Your API Key can be found here. You should use environment
                  variables or a secret management tool to expose your key to your
                  applications.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}


export const Code = ({ children, title, status = "pending" }: CodeProps) => {
  return (
    <div className="rounded-md bg-black border">
      {title && <div className={clsx("border-b p-1 px-2 font-normal opacity-75 text-sm", statuses[status])}> <p>{title}</p></div>}
      <pre className='p-4 whitespace-pre-wrap break-words'>
        <code className={clsx("w-full break-all grid gap-1 text-sm", statuses[status])}>
          {children}
        </code>
      </pre>
    </div >
  )
}