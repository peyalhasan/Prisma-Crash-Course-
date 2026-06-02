import { db } from "../../../lib/db";
import { NextResponse } from "next/server";


export async function POST(request) {

    try{
        const {title, description, type, content } = await request.json();

        if (!title ){
         return NextResponse.json({error: "Title is required"}, {status: 400})
        }
        if (!description ){
            return NextResponse.json({error: "Description is required"}, {status: 400})
        }

        if (!type ){
            return NextResponse.json({error: "Type is required"}, {status: 400})
        }

        const pin = await db.pin.create({
            data: {
                title,
                description,
                type,
                content
            }
        })

        return NextResponse.json(pin, {status: 201})
    }catch(error){
        console.error("Error creating pin:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

}
