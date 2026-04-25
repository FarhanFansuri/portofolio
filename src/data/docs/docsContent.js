export const docsCatalog = [
  {
    slug: 'networking',
    title: 'Networking',
    description: 'Core networking concepts from protocol basics to production troubleshooting workflows.',
    icon: 'GlobeAltIcon',
    tags: ['osi', 'tcp-ip', 'dns', 'http'],
    documents: [
      {
        slug: 'intro-networking',
        title: 'Introduction to Networking',
        group: 'Introduction',
        description: 'Memahami pondasi komunikasi data modern.',
        content: [
          {
            type: 'h2',
            text: 'Overview'
          },
          {
            type: 'paragraph',
            text: 'Networking adalah proses pertukaran data antar perangkat menggunakan standar protokol yang disepakati bersama. Fokus utama di tahap awal adalah memahami jalur data, model layer, dan peran setiap komponen jaringan.'
          },
          {
            type: 'h2',
            text: 'Fundamental Concepts'
          },
          {
            type: 'list',
            ordered: false,
            items: [
              'IP address sebagai identitas endpoint di jaringan.',
              'Subnet untuk membagi jaringan menjadi domain yang lebih efisien.',
              'Routing untuk menentukan rute terbaik paket data.',
              'DNS untuk translasi domain menjadi alamat IP.'
            ]
          },
          {
            type: 'h2',
            text: 'Implementation'
          },
          {
            type: 'code',
            language: 'bash',
            code: 'ipconfig /all\nnslookup example.com\ntracert example.com'
          },
          {
            type: 'blockquote',
            text: 'Biasakan verifikasi layer paling dasar terlebih dahulu sebelum menyimpulkan gangguan berada di level aplikasi.'
          },
          {
            type: 'h2',
            text: 'Best Practices'
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Dokumentasikan topologi jaringan secara versioned.',
              'Gunakan naming convention yang konsisten pada subnet dan VLAN.',
              'Pisahkan network untuk internal service dan public facing service.'
            ]
          },
          {
            type: 'h2',
            text: 'Summary'
          },
          {
            type: 'paragraph',
            text: 'Pemahaman layer jaringan membantu troubleshooting menjadi sistematis dan mengurangi trial-and-error yang tidak perlu.'
          }
        ]
      },
      {
        slug: 'tcp-http-basics',
        title: 'TCP and HTTP Basics',
        group: 'Basic Concepts',
        description: 'Menghubungkan transport layer dengan web protocol.',
        content: [
          { type: 'h2', text: 'Overview' },
          {
            type: 'paragraph',
            text: 'TCP memberikan koneksi reliable berbasis handshake, sedangkan HTTP membangun aturan pertukaran request-response pada level aplikasi.'
          },
          { type: 'h2', text: 'Fundamental Concepts' },
          {
            type: 'h3',
            text: 'Three-way Handshake'
          },
          {
            type: 'list',
            ordered: true,
            items: ['SYN dari client.', 'SYN-ACK dari server.', 'ACK final dari client.']
          },
          {
            type: 'h3',
            text: 'HTTP Method Semantics'
          },
          {
            type: 'list',
            ordered: false,
            items: ['GET untuk retrieve data.', 'POST untuk create.', 'PUT/PATCH untuk update.', 'DELETE untuk remove resource.']
          },
          { type: 'h2', text: 'Implementation' },
          {
            type: 'code',
            language: 'bash',
            code: 'curl -i https://api.example.com/v1/health\ncurl -X POST https://api.example.com/v1/users \\\n  -H "Content-Type: application/json" \\\n  -d "{\"name\":\"Farhan\"}"'
          },
          { type: 'h2', text: 'Best Practices' },
          {
            type: 'blockquote',
            text: 'Pastikan API contract terdokumentasi agar perubahan payload tidak memutus integrasi antar tim.'
          },
          { type: 'h2', text: 'Summary' },
          {
            type: 'paragraph',
            text: 'TCP dan HTTP harus dipahami bersama karena masalah performa web sering berakar di transport layer maupun aplikasi layer.'
          }
        ]
      },
      {
        slug: 'network-observability',
        title: 'Network Observability',
        group: 'Advanced Topics',
        description: 'Strategi monitoring dan incident response jaringan modern.',
        content: [
          { type: 'h2', text: 'Overview' },
          {
            type: 'paragraph',
            text: 'Observability membantu mendeteksi degradasi latency, packet loss, dan availability issue lebih cepat melalui metrics, logs, dan traces.'
          },
          { type: 'h2', text: 'Fundamental Concepts' },
          {
            type: 'list',
            ordered: false,
            items: [
              'Golden signals: latency, traffic, errors, saturation.',
              'SLO untuk menetapkan objective layanan secara kuantitatif.',
              'Alerting berbasis symptom, bukan sekadar resource threshold.'
            ]
          },
          { type: 'h2', text: 'Implementation' },
          {
            type: 'code',
            language: 'javascript',
            code: 'export function evaluateLatencyP95(milliseconds) {\n  if (milliseconds > 500) return "critical"\n  if (milliseconds > 250) return "warning"\n  return "healthy"\n}'
          },
          { type: 'h2', text: 'Best Practices' },
          {
            type: 'list',
            ordered: true,
            items: [
              'Tetapkan runbook untuk setiap alert kritikal.',
              'Sertakan owner service di metadata alert.',
              'Lakukan postmortem tanpa blame setelah incident major.'
            ]
          },
          { type: 'h2', text: 'Summary' },
          {
            type: 'paragraph',
            text: 'Monitoring yang baik tidak hanya mendeteksi masalah, tetapi juga mempercepat proses diagnosis dan pemulihan.'
          }
        ]
      }
    ]
  },
  {
    slug: 'backend-development',
    title: 'Backend Development',
    description: 'Designing API services, domain boundaries, and reliable backend delivery practices.',
    icon: 'ServerStackIcon',
    tags: ['api', 'architecture', 'service', 'testing'],
    documents: [
      {
        slug: 'backend-overview',
        title: 'Backend Service Overview',
        group: 'Introduction',
        description: 'Pemetaan komponen utama layanan backend.',
        content: [
          { type: 'h2', text: 'Overview' },
          {
            type: 'paragraph',
            text: 'Backend bertanggung jawab pada business logic, data persistence, integrasi antar service, dan enforcement security policy pada sisi server.'
          },
          { type: 'h2', text: 'Fundamental Concepts' },
          {
            type: 'list',
            ordered: false,
            items: ['Routing layer', 'Service layer', 'Repository/data access layer', 'Cross-cutting concern: auth, logging, caching']
          },
          { type: 'h2', text: 'Implementation' },
          {
            type: 'code',
            language: 'javascript',
            code: 'async function createOrder(input, deps) {\n  const valid = deps.validator.validate(input)\n  if (!valid.ok) throw new Error(valid.message)\n\n  return deps.orderRepository.insert({\n    userId: input.userId,\n    items: input.items,\n    status: "pending"\n  })\n}'
          },
          { type: 'h2', text: 'Best Practices' },
          {
            type: 'blockquote',
            text: 'Pisahkan domain logic dari framework agar kode lebih mudah diuji dan dipindahkan antar platform.'
          },
          { type: 'h2', text: 'Summary' },
          {
            type: 'paragraph',
            text: 'Arsitektur backend yang rapi meningkatkan maintainability saat kompleksitas sistem tumbuh.'
          }
        ]
      },
      {
        slug: 'api-versioning',
        title: 'API Versioning Strategy',
        group: 'Basic Concepts',
        description: 'Menjaga kompatibilitas API secara berkelanjutan.',
        content: [
          { type: 'h2', text: 'Overview' },
          { type: 'paragraph', text: 'Versioning mencegah breaking change langsung berdampak ke seluruh consumer API.' },
          { type: 'h2', text: 'Fundamental Concepts' },
          {
            type: 'list',
            ordered: true,
            items: ['Gunakan URI versioning untuk adopsi cepat.', 'Sediakan masa deprecate yang jelas.', 'Dokumentasikan changelog tiap release.']
          },
          { type: 'h2', text: 'Implementation' },
          {
            type: 'code',
            language: 'bash',
            code: 'GET /api/v1/users\nGET /api/v2/users\n\nDeprecation: true\nSunset: Wed, 30 Sep 2026 23:59:59 GMT'
          },
          { type: 'h2', text: 'Best Practices' },
          {
            type: 'blockquote',
            text: 'Tambah contract test agar perubahan schema segera terdeteksi sebelum deploy produksi.'
          },
          { type: 'h2', text: 'Summary' },
          { type: 'paragraph', text: 'Versioning yang disiplin mengurangi biaya migrasi dan menjaga trust developer consumer API.' }
        ]
      },
      {
        slug: 'resilience-patterns',
        title: 'Resilience Patterns',
        group: 'Advanced Topics',
        description: 'Circuit breaker, retry, timeout, dan fallback untuk sistem backend.',
        content: [
          { type: 'h2', text: 'Overview' },
          {
            type: 'paragraph',
            text: 'Resilience pattern membuat service tetap responsif ketika dependency eksternal mengalami gangguan.'
          },
          { type: 'h2', text: 'Fundamental Concepts' },
          {
            type: 'list',
            ordered: false,
            items: ['Timeout untuk membatasi durasi request.', 'Retry dengan exponential backoff.', 'Circuit breaker untuk mencegah cascading failure.']
          },
          { type: 'h2', text: 'Implementation' },
          {
            type: 'code',
            language: 'javascript',
            code: 'async function withRetry(task, maxAttempt = 3) {\n  let attempt = 0\n  while (attempt < maxAttempt) {\n    try {\n      return await task()\n    } catch (error) {\n      attempt += 1\n      if (attempt >= maxAttempt) throw error\n      await new Promise(resolve => setTimeout(resolve, 2 ** attempt * 100))\n    }\n  }\n}'
          },
          { type: 'h2', text: 'Best Practices' },
          {
            type: 'list',
            ordered: true,
            items: ['Gunakan idempotency key pada endpoint mutasi.', 'Catat retry attempt sebagai observability signal.', 'Audit timeout value berdasarkan SLO.']
          },
          { type: 'h2', text: 'Summary' },
          {
            type: 'paragraph',
            text: 'Resilience bukan fitur tambahan, tetapi bagian inti desain backend production-grade.'
          }
        ]
      }
    ]
  },
  {
    slug: 'database',
    title: 'Database',
    description: 'Data modeling, indexing, query optimization, and reliability patterns for persistence.',
    icon: 'CircleStackIcon',
    tags: ['sql', 'index', 'normalization', 'transaction'],
    documents: [
      {
        slug: 'db-introduction',
        title: 'Database Fundamentals',
        group: 'Introduction',
        description: 'Konsep dasar pengelolaan data terstruktur.',
        content: [
          { type: 'h2', text: 'Overview' },
          {
            type: 'paragraph',
            text: 'Database menyediakan mekanisme penyimpanan dan pengambilan data secara konsisten serta aman dalam skala besar.'
          },
          { type: 'h2', text: 'Fundamental Concepts' },
          {
            type: 'list',
            ordered: false,
            items: ['Entity dan relationship', 'Normalization', 'Primary key dan foreign key', 'ACID transaction']
          },
          { type: 'h2', text: 'Implementation' },
          {
            type: 'code',
            language: 'sql',
            code: 'CREATE TABLE users (\n  id BIGINT PRIMARY KEY,\n  email VARCHAR(150) UNIQUE NOT NULL,\n  created_at TIMESTAMP NOT NULL\n);'
          },
          { type: 'h2', text: 'Best Practices' },
          {
            type: 'blockquote',
            text: 'Buat migration script idempotent sehingga deployment schema bisa diulang secara aman.'
          },
          { type: 'h2', text: 'Summary' },
          {
            type: 'paragraph',
            text: 'Model data yang jelas sejak awal mengurangi refactor besar saat fitur bertambah.'
          }
        ]
      },
      {
        slug: 'query-optimization',
        title: 'Query Optimization',
        group: 'Basic Concepts',
        description: 'Teknik meningkatkan performa query secara terukur.',
        content: [
          { type: 'h2', text: 'Overview' },
          {
            type: 'paragraph',
            text: 'Optimasi query dimulai dari memahami execution plan dan bottleneck I/O.'
          },
          { type: 'h2', text: 'Fundamental Concepts' },
          {
            type: 'list',
            ordered: true,
            items: ['Gunakan index sesuai pola akses.', 'Hindari select star di endpoint kritikal.', 'Evaluasi cardinality pada kolom filter.']
          },
          { type: 'h2', text: 'Implementation' },
          {
            type: 'code',
            language: 'sql',
            code: 'EXPLAIN ANALYZE\nSELECT id, email\nFROM users\nWHERE created_at >= NOW() - INTERVAL \"7 day\"\nORDER BY created_at DESC\nLIMIT 100;'
          },
          { type: 'h2', text: 'Best Practices' },
          {
            type: 'blockquote',
            text: 'Selalu ukur sebelum dan sesudah optimasi agar perubahan benar-benar berdampak.'
          },
          { type: 'h2', text: 'Summary' },
          {
            type: 'paragraph',
            text: 'Performa database meningkat signifikan ketika optimasi berbasis data aktual, bukan asumsi.'
          }
        ]
      },
      {
        slug: 'database-reliability',
        title: 'Database Reliability',
        group: 'Advanced Topics',
        description: 'Backup, replication, dan failover strategy.',
        content: [
          { type: 'h2', text: 'Overview' },
          {
            type: 'paragraph',
            text: 'Reliability memastikan data tetap tersedia dan dapat dipulihkan saat terjadi gangguan sistem.'
          },
          { type: 'h2', text: 'Fundamental Concepts' },
          {
            type: 'list',
            ordered: false,
            items: ['RPO dan RTO', 'Full backup vs incremental backup', 'Read replica dan automatic failover']
          },
          { type: 'h2', text: 'Implementation' },
          {
            type: 'code',
            language: 'bash',
            code: 'pg_dump --format=custom --file=backup_$(date +%F).dump mydb\npg_restore --dbname=mydb_restore backup_2026-04-25.dump'
          },
          { type: 'h2', text: 'Best Practices' },
          {
            type: 'list',
            ordered: true,
            items: ['Lakukan restore drill terjadwal.', 'Monitor replication lag.', 'Enkripsi backup at-rest dan in-transit.']
          },
          { type: 'h2', text: 'Summary' },
          { type: 'paragraph', text: 'Reliability plan wajib diuji berkala, bukan hanya ditulis di dokumen.' }
        ]
      }
    ]
  },
  {
    slug: 'security',
    title: 'Security',
    description: 'Security mindset, secure coding practices, and practical hardening techniques.',
    icon: 'ShieldCheckIcon',
    tags: ['owasp', 'auth', 'hardening', 'threat-modeling'],
    documents: [
      {
        slug: 'security-primer',
        title: 'Security Primer',
        group: 'Introduction',
        description: 'Fondasi berpikir defensif untuk software engineer.',
        content: [
          { type: 'h2', text: 'Overview' },
          {
            type: 'paragraph',
            text: 'Security engineering berfokus pada pengurangan risiko, bukan mengejar kondisi absolut tanpa celah.'
          },
          { type: 'h2', text: 'Fundamental Concepts' },
          {
            type: 'list',
            ordered: false,
            items: ['Confidentiality, Integrity, Availability', 'Least privilege principle', 'Defense in depth']
          },
          { type: 'h2', text: 'Implementation' },
          {
            type: 'code',
            language: 'javascript',
            code: 'function sanitizeInput(value) {\n  return value.replace(/[<>]/g, "")\n}\n\nfunction requireRole(user, role) {\n  if (!user.roles.includes(role)) {\n    throw new Error("Forbidden")\n  }\n}'
          },
          { type: 'h2', text: 'Best Practices' },
          {
            type: 'blockquote',
            text: 'Setiap fitur baru sebaiknya melalui threat modeling ringan sebelum implementasi detail.'
          },
          { type: 'h2', text: 'Summary' },
          { type: 'paragraph', text: 'Security yang efektif dibangun dari budaya engineering yang konsisten, bukan dari satu tools saja.' }
        ]
      },
      {
        slug: 'auth-authorization',
        title: 'Authentication and Authorization',
        group: 'Basic Concepts',
        description: 'Strategi auth modern untuk web application.',
        content: [
          { type: 'h2', text: 'Overview' },
          {
            type: 'paragraph',
            text: 'Authentication memverifikasi identitas user, sementara authorization menentukan hak akses terhadap resource.'
          },
          { type: 'h2', text: 'Fundamental Concepts' },
          {
            type: 'list',
            ordered: true,
            items: ['Session-based auth', 'Token-based auth', 'Role-based access control']
          },
          { type: 'h2', text: 'Implementation' },
          {
            type: 'code',
            language: 'javascript',
            code: 'const tokenPayload = {\n  sub: user.id,\n  role: user.role,\n  exp: Math.floor(Date.now() / 1000) + 60 * 60\n}\n\nconst accessToken = signJwt(tokenPayload, process.env.JWT_SECRET)'
          },
          { type: 'h2', text: 'Best Practices' },
          {
            type: 'list',
            ordered: false,
            items: ['Set token expiration dengan durasi rasional.', 'Gunakan secure, httpOnly cookie bila memakai session.', 'Audit permission secara berkala.']
          },
          { type: 'h2', text: 'Summary' },
          { type: 'paragraph', text: 'Model auth yang tepat mempengaruhi UX, performa, dan keamanan sistem secara langsung.' }
        ]
      },
      {
        slug: 'secure-deployment',
        title: 'Secure Deployment Checklist',
        group: 'Advanced Topics',
        description: 'Checklist praktis sebelum release ke production.',
        content: [
          { type: 'h2', text: 'Overview' },
          {
            type: 'paragraph',
            text: 'Deployment aman membutuhkan kombinasi configuration hardening, secret management, dan monitoring.'
          },
          { type: 'h2', text: 'Fundamental Concepts' },
          {
            type: 'list',
            ordered: false,
            items: ['Secret rotation', 'Transport encryption', 'Dependency scanning', 'Runtime monitoring']
          },
          { type: 'h2', text: 'Implementation' },
          {
            type: 'code',
            language: 'bash',
            code: 'npm audit --production\ntrivy image registry.example.com/my-service:1.4.2\nhelm upgrade --install my-service ./chart --set image.tag=1.4.2'
          },
          { type: 'h2', text: 'Best Practices' },
          {
            type: 'blockquote',
            text: 'Automasi security check di CI/CD agar standard keamanan tidak bergantung pada proses manual.'
          },
          { type: 'h2', text: 'Summary' },
          {
            type: 'paragraph',
            text: 'Checklist deployment yang disiplin menurunkan risiko misconfiguration dan mempercepat respon saat incident.'
          }
        ]
      }
    ]
  }
]

export const docsBySlug = docsCatalog.reduce((acc, category) => {
  acc[category.slug] = category
  return acc
}, {})

export function findDoc(categorySlug, docSlug) {
  const category = docsBySlug[categorySlug]
  if (!category) return null

  if (!docSlug) {
    return category.documents[0] ?? null
  }

  return category.documents.find(doc => doc.slug === docSlug) ?? null
}
