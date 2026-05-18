import { renderToPipeableStream } from "react-dom/server";
import { ServerRouter } from "react-router/dom/server";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: any
) {
  return new Promise((resolve) => {
    let didError = false;

    const { pipe } = renderToPipeableStream(
      <ServerRouter
        context={routerContext}
        url={request.url}
      />,
      {
        onShellReady() {
          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(pipe, {
              status: didError ? 500 : responseStatusCode,
              headers: responseHeaders,
            })
          );
        },
        onError(err) {
          didError = true;
          console.error(err);
        },
      }
    );
  });
}
