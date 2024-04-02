import { NextResponse } from "next/server";
import connect from "../../../lib/md";
import Patient from "../../../models/patient";
import {verifyJwt} from "../../../lib/jwt.ts"

export async function GET ({params}){
    const {token} = params;
    const payload= verifyJwt(token);
    await connect();
    const patient = Patient.findById(payload.id);

    return NextResponse({patient})

}


export async function PUT (request, {params}){
    const {token} = params;
    const {fullName, sexe, photo, bloodType} = request.json();

    const payload= verifyJwt(token);
    await connect();
    const patient = Patient.findByIdAndUpdate(payload.id, {fullName,sexe,photo,bloodType});
    return NextResponse({message: "patient updated"})

}

export async function DELETE ({params}){
    const {token} = params;
    const payload= verifyJwt(token);
    await connect();
    const patient = Patient.findByIdAndDelete(payload.id);

    return NextResponse({patient})

}