import { useClientLibrary } from "@typespec/http-client";
import * as ts from "@alloy-js/typescript";

export interface ClientProps {}

// TODO: replace by a real world generation
export function Client(props: ClientProps) {
  const { topLevel } = useClientLibrary();
  return (
    <ts.SourceFile path="index.ts">
      console.log("hello {topLevel.map((lev) => lev.name).join(", ")}!");
    </ts.SourceFile>
  );
}
