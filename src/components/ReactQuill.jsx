import dynamic from "next/dynamic";
import React from "react";

const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import("react-quill");
        return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
    },
    {
        ssr: false,
    }
);

export default ReactQuill