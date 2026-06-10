import { db } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    try{
        const { id } = await request.json();
        await db.pin.delete({ where: { id } });
        return NextResponse.json({ message: "Pin deleted" });

    }catch(error){
        return NextResponse.json({ error: "Failed to delete pin" }, { status: 500 });   
    }
}
