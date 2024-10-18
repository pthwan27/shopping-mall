import { routes } from "./routes.tsx";
import { getClient } from "./queryClient.tsx";
import { useRoutes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Gnb from "./components/gnb.tsx";
import { RecoilRoot, useRecoilState } from "recoil";
import { modalState } from "./recoil/modal.ts";

const ModalProvider = () => {
  const [state] = useRecoilState(modalState);
  return (
    <>
      {state.map(({ id, element }) => {
        return <Component key={id} component={element} />;
      })}
    </>
  );
};
const Component = ({ component, ...rest }: { component: React.FC }) => {
  return component({ ...rest });
};

const App = () => {
  const element = useRoutes(routes);
  const queryClient = getClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Gnb />
      <div className="main-container">{element}</div>
      <ModalProvider />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

export default App;
