import { db } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { title, description, type, content } = await request.json();

        if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });
        if (!description) return NextResponse.json({ error: "Description is required" }, { status: 400 });
        if (!type) return NextResponse.json({ error: "Type is required" }, { status: 400 });

        const pin = await db.pin.update({
            where: { id },
            data: { title, description, type, content },
        });

        return NextResponse.json(pin, { status: 200 });
    } catch (error) {
        console.error("Error updating pin:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
