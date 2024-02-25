"use client"
import React from 'react'
import Studio from "@/pages/studio/Studio";

const Page = () => {
    return (
        <>
            <Studio mode={"new"} modelUrl={'/models/shirt/tshirt.glb'} />
        </>
    )
}
export default Page
