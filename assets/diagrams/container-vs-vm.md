# Containers vs. Virtual Machines

A visual comparison of traditional VM architecture (hypervisor-based) versus container architecture (OS-level virtualization). Containers share the host OS kernel and are more lightweight, while each VM includes a full guest OS.

```mermaid
graph LR
    subgraph VMs
        VM1[App A<br/>Bins/Libs<br/>Guest OS]
        VM2[App B<br/>Bins/Libs<br/>Guest OS]
        Hypervisor
    end
    subgraph Containers
        C1[App A<br/>Bins/Libs]
        C2[App B<br/>Bins/Libs]
        Docker[Docker Engine]
        HostOS[Host OS]
    end
    Hardware[Hardware<br/>CPU, RAM, Disk, NIC]
    Hardware --> Hypervisor
    Hypervisor --> VM1
    Hypervisor --> VM2
    Hardware --> HostOS
    HostOS --> Docker
    Docker --> C1
    Docker --> C2
```

**Key differences:**
- **VMs:** Each VM runs a full guest OS → GBs of overhead, minutes to boot, full isolation
- **Containers:** Containers share the host kernel → MBs of overhead, seconds to boot, process-level isolation
