type Route = {
    vehicle: number;
    stops: number[];
    distance?: number;
} | null;

export default function parseOutput(input : string) {
    const lines = input.trim().split('\n');
    const result: { objective: number, routes: Route[], maxRouteDistance: number } = {
        objective: 0,
        routes: [],
        maxRouteDistance: 0
    };

    let currentRoute : Route = null;

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('Objective:')) {
            result.objective = parseInt(line.split(' ')[1], 10);
        } else if (line.startsWith('Route for vehicle')) {
            if (currentRoute !== null) {
                result.routes.push(currentRoute);
            }
            currentRoute = {
                vehicle: parseInt(line.split(' ')[3].replace(':', ''), 10),
                stops: []
            };
        } else if (line.startsWith('Distance of the route:')) {
            if (currentRoute) {
                currentRoute.distance = parseInt(line.split(' ')[4].replace('m', ''), 10);
            }
        } else if (line.startsWith('Maximum of the route distances:')) {
            result.maxRouteDistance = parseInt(line.split(' ')[5].replace('m', ''), 10);
        } else if (currentRoute) {
            const stops = line.split(' -> ').map(stop => parseInt(stop, 10)).filter(stop => !isNaN(stop));
            currentRoute.stops.push(...stops);
        }
    });

    if (currentRoute !== null) {
        result.routes.push(currentRoute);
    }

    return result;
}