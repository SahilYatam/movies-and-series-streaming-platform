"use client";

import { AuthLayout, Divider } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/betterAuth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


export default function SignIn() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const { error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                setError(error.message || "Invalid email or password.");
                return;
            }

            const session = await authClient.getSession();

            console.log("SESSION AFTER LOGIN:", session);

            router.push("/");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to continue watching"
            footer={
                <>
                    New to Sora?{" "}
                    <Link href="/sign-up" className="text-primary hover:underline">
                        Create an account
                    </Link>
                </>
            }
        >
            {/* <Divider/> */}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    {error && (
                        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}

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

                <div className="flex items-center justify-between text-sm">
                    <button type="button" className="text-primary hover:underline">
                        Forgot password?
                    </button>
                </div>

                <Button type="submit" className="w-full rounded-lg py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 bg-primary">
                    {loading ? "Logging in..." : "Sign In"}
                </Button>

            </form>

        </AuthLayout>
    )

}
