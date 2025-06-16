import {ErrorBoundary} from "react-error-boundary";
import { AgentsView, AgentsViewError, AgentsViewLoading } from "@/modules/auth/ui/views/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { AgentsListHeader } from "@/modules/auth/ui/views/agents/ui/components/agents-list-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/auth/ui/views/agents/params";

interface Props{
  searchParams:Promise<SearchParams>;
};



const Page = async({searchParams}:Props) => {
  const params =await loadSearchParams(searchParams);
const session =await auth.api.getSession({
  headers: await headers(),
});
if(!session){
  redirect("/sign-in");
}

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
      ...params,
    }));
    return (<>
    <AgentsListHeader />
    <HydrationBoundary state={dehydrate(queryClient)}>
       <Suspense fallback={<AgentsViewLoading />}>
       <ErrorBoundary fallback={<AgentsViewError/>}>
        <AgentsView/>
       </ErrorBoundary>
       </Suspense>
    </HydrationBoundary>
    </>
)
};
 
export default Page;