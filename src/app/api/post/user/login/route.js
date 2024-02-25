import {NextResponse} from "next/server";
import connect from "@/lib/db";
import User from "@/models/User";

export const POST = async (req) => {
    const {user_email, user_password} = await req.json();

    try {
        await connect();

        const user = await User.findOne({
            email: user_email,
        });

        if (user) {
            return new Response(JSON.stringify({...user, found: true}), {
                headers: {
                  "Content-Type": "application/json",
                  "Set-Cookie": `session=true; path=/;`,
                },
                status: 200
            });
        } else {
            return new Response(JSON.stringify({...user, found: false}), {
                headers: {
                    "Content-Type": "application/json",
                    "Set-Cookie": `session=false; path=/;`,
                },
                status: 200
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'Error Logging In: ' + error});
    }
}