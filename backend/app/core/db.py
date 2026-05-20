import os
from typing import AsyncGenerator
from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

# Configurar banco de dados Postgres via ENV
PG_USER = os.getenv("POSTGRES_USER", "postgres")
PG_PASS = os.getenv("POSTGRES_PASSWORD", "postgres")
PG_DB = os.getenv("POSTGRES_DB", "sigi_db")
PG_HOST = os.getenv("POSTGRES_HOST", "db")
PG_PORT = os.getenv("POSTGRES_PORT", "5432")

DATABASE_URL = os.getenv("DATABASE_URL", f"postgresql+asyncpg://{PG_USER}:{PG_PASS}@{PG_HOST}:{PG_PORT}/{PG_DB}")

engine = create_async_engine(DATABASE_URL, echo=True, future=True)

async def init_db():
    async with engine.begin() as conn:
        # Import models here to ensure they are registered with SQLModel.metadata
        from app.modules.fleet import models
        await conn.run_sync(SQLModel.metadata.create_all)

async_session_maker = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session
