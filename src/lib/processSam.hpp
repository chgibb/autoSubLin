#pragma once
#include <fstream>
#include <vector>
#include <string>
#include <memory>

#include "reports/report.hpp"
#include "reports/count.hpp"

bool processSam(std::string fileName)
{
    std::vector<std::unique_ptr<Report>> reports;

    reports.push_back(std::unique_ptr<Report>(new Count()));

    std::ifstream inFile(fileName.c_str());

    if(!inFile)
        return false;

    std::string line;
    auto end = reports.end();
    while(std::getline(inFile,line))
    {
        for(auto it = reports.begin(); it != end; ++it)
        {
            (*it)->process(line);
        }
    }

    for(auto it = reports.begin(); it != end; ++it)
    {
        (*it)->write(fileName);
    }
    
    return true;
}