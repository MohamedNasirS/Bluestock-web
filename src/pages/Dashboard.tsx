
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

const mockData = [
  {
    company: "Adani Power",
    priceBand: "₹329 - 136",
    open: "2023-06-03",
    close: "2024-06-06",
    issueSize: "45530.15 Cr",
    issueType: "Book Built",
    listingDate: "2023-06-10",
    status: "Ongoing",
  },
  // Add more mock data as needed
];

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Upcoming IPO | Dashboard</h1>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Price Band</TableHead>
              <TableHead>Open</TableHead>
              <TableHead>Close</TableHead>
              <TableHead>Issue Size</TableHead>
              <TableHead>Issue Type</TableHead>
              <TableHead>Listing Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Delete/View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((ipo, index) => (
              <TableRow key={index}>
                <TableCell>{ipo.company}</TableCell>
                <TableCell>{ipo.priceBand}</TableCell>
                <TableCell>{ipo.open}</TableCell>
                <TableCell>{ipo.close}</TableCell>
                <TableCell>{ipo.issueSize}</TableCell>
                <TableCell>{ipo.issueType}</TableCell>
                <TableCell>{ipo.listingDate}</TableCell>
                <TableCell>
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {ipo.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="secondary">Update</Button>
                </TableCell>
                <TableCell className="space-x-2">
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Dashboard;
