"use client";

import { AuthLayout, Divider } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";


export default function SignUp(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Start streaming in under a minute."
            footer={
                <>
                    Already have an account?{" "}
                    <Link href="/sign-in" className="text-primary hover:underline">
                        Sign in
                    </Link>
                </>
            }
        >
            {/* <Divider/> */}

            <form className="space-y-4">
                <div className="space-y-2">
                    {error && (
                        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}

                    <Label htmlFor="name" className="block">
                        Name
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"

                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="block">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"

                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="block">
                        Password
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={8}
                        required
                        className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                    />
                </div>
            
                <Button type="submit" className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                    {loading ? "Creating account..." : "Sign Up"}
                </Button>
                
            </form>

        </AuthLayout>
    )

}
