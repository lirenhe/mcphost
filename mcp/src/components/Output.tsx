import * as ay from "@alloy-js/core";
import { ClientLibrary } from "@typespec/http-client/components";

export interface OutputProps {
  children?: ay.Children;
}

export function Output(props: OutputProps) {
  return (
    <ay.Output>
      <ClientLibrary>{props.children}</ClientLibrary>
    </ay.Output>
  );
}
