import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type GetRoomsAPIResponse = Array<{
   id: string
   name: string 
}>


export function CreateRoom() {

    const { data, isLoading, } = useQuery({
        queryKey: ['get-rooms'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3333/rooms')

            const result: GetRoomsAPIResponse = await response.json()

            return result
        }
    })

    return (
        <div>
            <div>
                Create Room
            </div>

            {isLoading && <p>Carregando...</p>}
            <div className="flex flex-col gap-1">
                {/* Também pode-se fazer data?.map()*/}
                {data && data.map(room => {

                    return (
                        <div key={room.id}>
                            <Link to={`/room/${room.id}`}>{room.name}</Link>
                        </div>
                    )

                })}
            </div>

        </div>
    )
}