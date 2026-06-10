import { db } from "../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {

    try{
        const pins = await db.pin.findMany({
            orderBy: {createdAt: "desc"},
             
        });
        return NextResponse.json(pins, {status: 200})
    }
    catch(error){
        console.error("Error fetching pins:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

}

export async function DELETE(request) {
    try {
        const { id } = await request.json();
        await db.pin.delete({ where: { id } });
        return NextResponse.json({ message: "Deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting pin:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}