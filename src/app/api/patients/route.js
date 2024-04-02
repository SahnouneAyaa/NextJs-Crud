import { NextResponse } from "next/server";
import connect from "../../../lib/md";
import Patient from "../../../models/patient"



export async function GET (request){
    await connect();
    const patients= await Patient.find();
    return NextResponse.json({patients})
}