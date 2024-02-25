import {NextResponse} from "next/server";
import connect from "@/lib/db";
import Model from "@/models/Model";
import {saveImage} from "@/lib/dbHelpers";
import fs from 'fs';
import path from 'path';

export const POST = async (req) => {
    const {savedObj} = await req.json();
    const {email,backgroundColor, modelType, decalsData, modelColor, name, desc, sizeType, scale, snapshot} = savedObj
    try {
        await connect()
        const snap = await saveImage(snapshot)
        const data = await Model.find().where({name: name, email: email})

        await Promise.all(decalsData.map(async decal => {
            if (data.length === 0) {
                decal.texture = await saveImage(decal.texture);
                console.log("DATA IS EMPTY")
                return
            }

            let DD = data[0].decalsData
            console.log()
            console.log()
            for (const d of DD) {
                console.log("CHECKING", d.key)
            }
            let oldDecal = DD.find(d => (d.key == decal.key))
            console.log(decal.key, ":", oldDecal?.key, typeof oldDecal)
            if (!oldDecal) {
                decal.texture = await saveImage(decal.texture);
                console.log("CREATED")
            } else {
                console.log("NOT CREATED")
                decal.texture = oldDecal.texture
            }
            console.log('////////////////')
        }));

        if (data.length > 0) {
            const absolutePath = path.join(process.cwd(), 'public', data[0].snapshot);
            fs.unlinkSync(absolutePath);

            await Model.updateOne({
                name: name,
                email: email,
            }, {
                scale: scale,
                snapshot: snap,
                sizeType: sizeType,
                modelType: modelType,
                decalsData: decalsData,
                modelColor: modelColor,
                backgroundColor: backgroundColor
            })
        } else {
            await Model.create({
                email: email,
                name: name,
                desc: desc,
                scale: scale,
                snapshot: snap,
                sizeType: sizeType,
                modelType: modelType,
                decalsData: decalsData,
                modelColor: modelColor,
                backgroundColor: backgroundColor
            })
        }

        return NextResponse.json({message: 'Model was Saved'});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'Error Saving Model: ' + error});
    }
}