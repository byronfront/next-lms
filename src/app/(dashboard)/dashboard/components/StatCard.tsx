import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatCard({
    title,
    value,
}: {
    title: string
    value: string | number
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
                {value}
            </CardContent>
        </Card>
    )
}