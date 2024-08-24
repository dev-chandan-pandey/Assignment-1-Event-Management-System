const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const currentEvents = events.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

return (
    <Box p={4}>
        <Heading size="lg" mb={4}>Events</Heading>
        {error && <Text color="red.500">{error}</Text>}
        <VStack spacing={4} align="stretch">
            {currentEvents.map(event => (
                <Box key={event._id} p={4} borderRadius="md" boxShadow="md">
                    <Heading size="md">{event.name}</Heading>
                    <Text>{event.description}</Text>
                    <Link to={`/events/${event._id}`}>
                        <Button mt={2} colorScheme="teal">View Details</Button>
                    </Link>
                    <Button mt={2} ml={2} colorScheme="red" onClick={() => handleDelete(event._id)}>Delete</Button>
                </Box>
            ))}
        </VStack>
        <Pagination
            currentPage={currentPage}
            totalCount={events.length}
            pageSize={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
        />
    </Box>
);
const [searchTerm, setSearchTerm] = useState('');

const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
    <Box p={4}>
        <Heading size="lg" mb={4}>Events</Heading>
        <Input
            placeholder="Search events"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mb={4}
        />
        {error && <Text color="red.500">{error}</Text>}
        <VStack spacing={4} align="stretch">
            {filteredEvents.map(event => (
                <Box key={event._id} p={4} borderRadius="md" boxShadow="md">
                    <Heading size="md">{event.name}</Heading>
                    <Text>{event.description}</Text>
                    <Link to={`/events/${event._id}`}>
                        <Button mt={2} colorScheme="teal">View Details</Button>
                    </Link>
                    <Button mt={2} ml={2} colorScheme="red" onClick={() => handleDelete(event._id)}>Delete</Button>
                </Box>
            ))}
        </VStack>
    </Box>
);
