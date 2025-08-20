/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    // =========================
    // domain/entities
    // =========================
    {
      comment: "entitiesは自分自身とdomain直下の型・定数のみ参照可",
      from: { path: "^src/domain/entities/.+" },
      name: "entities-allowed",
      severity: "error",
      to: {
        pathNot: [
          "^src/domain/entities/.+",
          "^src/domain/[^/]+\\.ts$", // domain直下の型・定数
        ],
      },
    },

    // =========================
    // domain/gateways
    // =========================
    {
      comment: "gatewaysはentitiesのみ参照可",
      from: { path: "^src/domain/gateways/.+" },
      name: "gateways-allowed",
      severity: "error",
      to: { pathNot: ["^src/domain/entities/.+"] },
    },

    // =========================
    // usecases/dtos
    // =========================
    {
      comment: "dtosはプリミティブ or Plain Object or entities のみ",
      from: { path: "^src/usecases/dtos/.+" },
      name: "dtos-allowed",
      severity: "error",
      to: {
        pathNot: [
          "^src/domain/entities/.+",
          // ← dependency-cruiserではプリミティブ・Plain Objectは明示できないので実質entitiesのみ制御
        ],
      },
    },

    // =========================
    // usecases/**
    // =========================
    {
      comment: "usecasesはentities, gateways, dtos のみ参照可",
      from: { path: "^src/usecases/(?!dtos).+" },
      name: "usecases-allowed",
      severity: "error",
      to: {
        pathNot: [
          "^src/domain/entities/.+",
          "^src/domain/gateways/.+",
          "^src/usecases/dtos/.+",
        ],
      },
    },

    // =========================
    // interfaces/http/controllers
    // =========================
    {
      comment: "controllersはusecases, dtos, entities, http配下のみ参照可",
      from: { path: "^src/interfaces/http/controllers/.+" },
      name: "controllers-allowed",
      severity: "error",
      to: {
        pathNot: [
          "^src/usecases/.+",
          "^src/domain/entities/.+",
          "^src/interfaces/http/.+",
        ],
      },
    },

    // =========================
    // interfaces/http/middlewares
    // =========================
    {
      comment: "middlewaresはhttp配下のみ参照可",
      from: { path: "^src/interfaces/http/middlewares/.+" },
      name: "middlewares-allowed",
      severity: "error",
      to: { pathNot: ["^src/interfaces/http/.+"] },
    },

    // =========================
    // interfaces/http/routes
    // =========================
    {
      comment: "routesはcontrollersとmiddlewaresのみ参照可",
      from: { path: "^src/interfaces/http/routes/.+" },
      name: "routes-allowed",
      severity: "error",
      to: {
        pathNot: [
          "^src/interfaces/http/controllers/.+",
          "^src/interfaces/http/middlewares/.+",
        ],
      },
    },

    // =========================
    // interfaces/http/server.ts
    // =========================
    {
      comment: "server.tsはroutesとmiddlewaresのみ参照可",
      from: { path: "^src/interfaces/http/server\\.ts$" },
      name: "server-allowed",
      severity: "error",
      to: {
        pathNot: [
          "^src/interfaces/http/routes/.+",
          "^src/interfaces/http/middlewares/.+",
        ],
      },
    },

    // =========================
    // infrastructure/db/prisma.ts
    // =========================
    {
      comment: "prisma.tsはPrisma関連ライブラリのみ参照可",
      from: { path: "^src/infrastructure/db/prisma\\.ts$" },
      name: "prisma-allowed",
      severity: "error",
      to: {
        pathNot: ["^@prisma/.+", "prisma.+"], // 必要に応じ調整
      },
    },

    // =========================
    // infrastructure/repositories
    // =========================
    {
      comment: "repositoriesはgateways, entities, prisma.tsのみ参照可",
      from: { path: "^src/infrastructure/repositories/.+" },
      name: "repositories-allowed",
      severity: "error",
      to: {
        pathNot: [
          "^src/domain/gateways/.+",
          "^src/domain/entities/.+",
          "^src/infrastructure/db/prisma\\.ts$",
        ],
      },
    },

    // =========================
    // main.ts
    // =========================
    {
      comment: "main.tsは全レイヤー参照可（Composition Root）",
      from: { path: "^src/main\\.ts$" },
      name: "main-allowed",
      severity: "error",
      to: { pathNot: ["^src/.+"] }, // ← main.tsは全許可なので実質ルール不要だが一応書いておく
    },
  ],
  options: {
    tsConfig: {
      fileName: "tsconfig.json",
    },
    tsPreCompilationDeps: true,
  },
};
