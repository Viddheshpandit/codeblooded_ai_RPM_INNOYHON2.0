
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Patient {
  id: string;
  name: string;
  age: number;
  status: "stable" | "needs-attention" | "critical";
  lastUpdate: string;
  healthScore: number;
}

// Mock data for patients
const mockPatients: Patient[] = [
  {
    id: "p001",
    name: "Jane Smith",
    age: 45,
    status: "stable",
    lastUpdate: "2 hours ago",
    healthScore: 85
  },
  {
    id: "p002",
    name: "John Williams",
    age: 67,
    status: "needs-attention",
    lastUpdate: "1 hour ago",
    healthScore: 62
  },
  {
    id: "p003",
    name: "Sarah Johnson",
    age: 52,
    status: "stable",
    lastUpdate: "30 minutes ago",
    healthScore: 78
  },
  {
    id: "p004",
    name: "Michael Brown",
    age: 71,
    status: "critical",
    lastUpdate: "15 minutes ago",
    healthScore: 35
  },
  {
    id: "p005",
    name: "Emily Davis",
    age: 39,
    status: "stable",
    lastUpdate: "3 hours ago",
    healthScore: 92
  }
];

interface PatientListProps {
  limit?: number;
  showSearch?: boolean;
}

const PatientList = ({ limit, showSearch = true }: PatientListProps) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPatients(mockPatients);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setPatients(mockPatients);
      setIsRefreshing(false);
    }, 800);
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const displayPatients = limit ? filteredPatients.slice(0, limit) : filteredPatients;
  
  const getStatusBadge = (status: Patient["status"]) => {
    switch (status) {
      case "stable":
        return <Badge className="bg-green-500 hover:bg-green-600">Stable</Badge>;
      case "needs-attention":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Needs Attention</Badge>;
      case "critical":
        return <Badge className="bg-red-500 hover:bg-red-600">Critical</Badge>;
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 40) return "text-red-500";
    if (score < 70) return "text-amber-500";
    return "text-green-500";
  };

  if (isLoading) {
    return (
      <Card className="w-full animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(limit || 5)].map((_, index) => (
              <div key={index} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Patient List</CardTitle>
            <CardDescription>{filteredPatients.length} patients total</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh} 
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
        
        {showSearch && (
          <div className="relative mt-3">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search patients..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        {displayPatients.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Health Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-xs text-gray-500">Age: {patient.age}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(patient.status)}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${getScoreColor(patient.healthScore)}`}>
                      {patient.healthScore}/100
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">No patients found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientList;
